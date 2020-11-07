from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import time
import requests

EVENTS_RECEIVED_CHANNEL = "emit all events"

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
    all_event_types = [db_event.event_type for db_event in db.session.query(models.EventClass).all()]
    all_event_locations = [db_event.event_location for db_event in db.session.query(models.EventClass).all()]
    all_event_times = [db_event.event_time for db_event in db.session.query(models.EventClass).all()]

    socketio.emit(channel, {
        "all_event_types": all_event_types,
        "all_event_locations": all_event_locations,
        "all_event_times": all_event_times
    })

@app.route('/')
def index():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print("Someone connected")
    emit_all_events(EVENTS_RECEIVED_CHANNEL)

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')

@socketio.on("sending new event")
def create_event(data):
    print(data)
    print("DATATYPES: " + str([data["type"], data["location"], data["time"]]))
    db.session.add(models.EventClass(data["type"], data["location"], data["time"]))
    db.session.commit();

    emit_all_events(EVENTS_RECEIVED_CHANNEL)

@socketio.on("clear event history dev")
def clear_event_history(data):
    db.session.query(models.EventClass).delete()
    print("QUERIED")
    db.session.commit()

if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host = os.getenv("HOST", "0.0.0.0"),
        port = int(os.getenv("PORT", 8080))
    )