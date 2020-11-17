from os.path import join, dirname
import os
from dotenv import load_dotenv
import flask
import flask_sqlalchemy
import flask_socketio
from google.oauth2 import id_token
from google.auth.transport import requests as google_resquests

EVENTS_RECEIVED_CHANNEL = "emit all events"
USERS_RECEIVED_CHANNEL = "emit all users"

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

sql_user = os.environ['SQL_USER']
sql_pwd = os.environ['SQL_PASSWORD']

database_uri = os.getenv("DATABASE_URL") # use this for heroku launch

database_uri = "postgresql://{}:{}@localhost/postgres".format(sql_user,sql_pwd) # use this for local testing
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
import models

def emit_all_events(channel):
    all_event_owners = [db_event.event_owner for db_event in db.session.query(models.EventClass).all()]
    all_event_titles = [db_event.event_title for db_event in db.session.query(models.EventClass).all()]
    all_event_types = [db_event.event_type for db_event in db.session.query(models.EventClass).all()]
    all_event_locations = [db_event.event_location for db_event in db.session.query(models.EventClass).all()]
    all_event_times = [db_event.event_time for db_event in db.session.query(models.EventClass).all()]
    all_event_descriptions = [db_event.event_description for db_event in db.session.query(models.EventClass).all()]

    socketio.emit(channel, {
        "all_event_owners": all_event_owners,
        "all_event_titles": all_event_titles,
        "all_event_types": all_event_types,
        "all_event_locations": all_event_locations,
        "all_event_times": all_event_times,
        "all_event_descriptions": all_event_descriptions
    })

def emit_all_current_users(channel):
    all_current_user_names = [db_users.name for db_users in db.session.query(models.CurrentUsers).all()]
    all_current_user_connection_status = [db_users.connection_status for db_users in db.session.query(models.CurrentUsers).all()]

    socketio.emit(channel, {
        "all_current_user_names": all_current_user_names,
        "all_current_user_connection_status": all_current_user_connection_status
    })

    print(channel)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/home')
def home():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    emit_all_events(EVENTS_RECEIVED_CHANNEL)
    emit_all_current_users(USERS_RECEIVED_CHANNEL)

@socketio.on("disconnect")
def delete_user():
    print("DISCONNECTED: " + str(flask.request.sid))
    db.session.query(models.CurrentUsers).filter(models.CurrentUsers.client_socket_id == flask.request.sid).update({"connection_status": "offline"})
    db.session.commit()
    emit_all_current_users(USERS_RECEIVED_CHANNEL)

@socketio.on("oauth to server")
def connect_user_id(data):
    if (db.session.query(models.CurrentUsers.email).filter(models.CurrentUsers.email == data["email"]).first()) is not None:
        check_email = db.session.query(models.CurrentUsers.email).filter(models.CurrentUsers.email == data["email"]).first()[0]
        print(check_email)
        db.session.query(models.CurrentUsers).filter(models.CurrentUsers.email == data["email"]).update({"connection_status": "online"})
        db.session.query(models.CurrentUsers).filter(models.CurrentUsers.email == data["email"]).update({"client_socket_id": flask.request.sid})
        db.session.commit()

    else:
        db.session.add(models.CurrentUsers(data["name"], data["email"], data["socketID"], "online"))
        db.session.commit()

    socketio.emit(data["socketID"], {
            "name": data["name"]})

@socketio.on('google login')
def on_google_login(data):
    token = data['token']
    CLIENT_ID = "163716708396-talgj01aee74s8l35iv4opmpac915v0g.apps.googleusercontent.com"
    idinfo = None

    emit_all_events(EVENTS_RECEIVED_CHANNEL)
    emit_all_current_users(USERS_RECEIVED_CHANNEL)

    try:
        idinfo = id_token.verify_oauth2_token(token, google_resquests.Request(), CLIENT_ID)
    except Exception as e:
        print(e)
        return

    if idinfo['aud'] != CLIENT_ID:
        return

    email = idinfo['email']
    name = idinfo['name']
    profile_picture = idinfo['picture']

    user = db.session.query(models.User).get(email)
    if user is None:
        user = models.User(
            email=email,
            name=name,
            bio="",
            profile_picture=profile_picture
        )
        db.session.add(user)
        db.session.commit()

    socketio.emit("successful login", {
        "email": user.email,
        "name": user.name,
        "bio": user.bio,
        "profile_picture": user.profile_picture
    },
    room=flask.request.sid)

@socketio.on("sending new event")
def create_event(data):
    db.session.add(models.EventClass(data["owner"], data["title"], data["type"], data["location"], data["time"], data["description"]))
    db.session.commit()

    emit_all_events(EVENTS_RECEIVED_CHANNEL)
    emit_all_current_users(USERS_RECEIVED_CHANNEL)

@socketio.on("filter events")
def filter_events(data):
    print("filtering events")
    filters = data["filters"]
    
    filtered_event_owners = list()
    filtered_event_titles = list()
    filtered_event_types = list()
    filtered_event_locations = list()
    filtered_event_times = list()
    filtered_event_descriptions = list()
    
    for f in filters:
        filtered_event_owners += [db_event.event_owner for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
        filtered_event_titles += [db_event.event_title for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
        filtered_event_types += [db_event.event_type for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
        filtered_event_locations += [db_event.event_location for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
        filtered_event_times += [db_event.event_time for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
        filtered_event_descriptions += [db_event.event_description for db_event in db.session.query(models.EventClass).filter_by(event_type=f['value'])]
    
    socketio.emit(EVENTS_RECEIVED_CHANNEL, {
        "all_event_owners": filtered_event_owners,
        "all_event_titles": filtered_event_titles,
        "all_event_types": filtered_event_types,
        "all_event_locations": filtered_event_locations,
        "all_event_times": filtered_event_times,
        "all_event_descriptions": filtered_event_descriptions
    })

    print("sending filtered events")
        

if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host = os.getenv("HOST", "0.0.0.0"),
        port = int(os.getenv("PORT", 8080))
    )
