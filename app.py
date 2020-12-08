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
FRIENDS_RECEIVED_CHANNEL = "emit all friends"
FRIEND_REQUESTS_RECEIVED_CHANNEL = "receive friend requests"

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

sql_user = os.environ['SQL_USER']
sql_pwd = os.environ['SQL_PASSWORD']

# database_uri = "postgresql://{}:{}@localhost/postgres".format(sql_user,sql_pwd) # use this for local testing

database_uri = os.getenv("DATABASE_URL") # use this for heroku launch
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
import models

def get_received_friend_requests(user1: str):
    return db.session   .query(models.Message)\
                        .filter(
                            models.Message.to_user == user1,
                            models.Message.msg_type == models.MessageType.FriendRequest
                        )\
                        .all()

def emit_all_events(channel):
    all_event_ids = [db_event.id for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_owners = [db_event.event_owner for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_titles = [db_event.event_title for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_types = [db_event.event_type for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_locations = [db_event.event_location for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_times = [db_event.event_time for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_descriptions = [db_event.event_description for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]
    all_event_attendees = [db_event.event_attendees for db_event in db.session.query(models.EventClass).all() if db_event.event_visibility]

    socketio.emit(channel, {
        "all_event_ids": all_event_ids,
        "all_event_owners": all_event_owners,
        "all_event_titles": all_event_titles,
        "all_event_types": all_event_types,
        "all_event_locations": all_event_locations,
        "all_event_times": all_event_times,
        "all_event_descriptions": all_event_descriptions,
        "all_event_attendees": all_event_attendees
    })

def emit_all_current_users(channel):
    db_users = db.session.query(models.CurrentUsers).all()
    all_current_user_names = [user.name for user in db_users]
    all_current_user_connection_status = [user.connection_status for user in db_users]
    all_current_user_emails = [user.email for user in db_users]

    socketio.emit(channel, {
        "all_current_user_names": all_current_user_names,
        "all_current_user_connection_status": all_current_user_connection_status,
        "all_current_user_emails": all_current_user_emails,
    })

    print(channel)

def emit_user_friends(channel, email):
    user_friends = [db_friend.user2 for db_friend in db.session .query(models.Friends.user2)\
                                                                .filter(models.Friends.user1 == email)\
                                                                .all()]
    user_friends += [db_friend.user1 for db_friend in db.session.query(models.Friends.user1)\
                                                                .filter(models.Friends.user2 == email)\
                                                                .all()]
    user_friends = set(user_friends)

    friends_list = []
    for friend in user_friends:
        user = db.session.query(models.CurrentUsers).filter(models.CurrentUsers.email == friend).first()
        friends_list.append({
            "name": user.name,
            "connection_status": user.connection_status,
            "email": user.email,
        })

    print(friends_list)
    socketio.emit(channel, {
        "friends": friends_list
    }, room=flask.request.sid)

def emit_user_friend_requests(channel, email):
    response = get_received_friend_requests(email)
    friend_requests = [{"from": msg.from_user} for msg in response]
    socketio.emit(channel, {
        'requests': friend_requests
    }, room=flask.request.sid)

def emit_all_messages():
    #all_chat_id = [db_message.id for db_message in db.session.query(models.Chat_Message).all()]
    all_chat_user = [
        db_message.username for db_message in db.session.query(models.Chat_Message).all()
        ]
    #all_chat_email = [db_message.email for db_message in db.session.query(models.Chat_Message).all()]
    all_chat_messages = [
        db_message.message for db_message in db.session.query(models.Chat_Message).all()
        ]
    all_message_row = models.db.session.query(models.Chat_Message).all()
    all_messages = []
    for message_row in all_message_row:
        if message_row.message:
            all_messages.append(message_row.message)
        else:
            continue
    #messages = lst.append(all_chat_messages)
    #print(messages)
    socketio.emit("messages received", {
        "allMessages": all_messages
    })

@socketio.on("new message input")
def room_messages(data):
    print("input the data:", data)
    #print(data['messsage'])
    #print("New login from user:", data["username"])
    #db_messages = db.session.query(models.Chat_Message).all()
    #all_current_user_names = [user.name for user in db_messages]
    #socketio.emit(data, {
    #    "all_messages": all_chat_messages
    #})

    #all_chat_messages = [
    #    db_message.message for db_message in db.session.query(models.Chat_Message).all()
    #    ]
    #db.session.add(db.seesion.query(models.Chat_Message.message).filter(models.Chat_Message.message == data).first()[0]
    #print(flask.request.sid)
    #username = models.db.session.query(models.CurrentUsers).filter_by(client_socket_id = flask.request.sid).first()
    #print("+", username)
    db.session.add(models.Chat_Message(data['message']))

    #message = db.session.query(models.Chat_Message.message).filter(models.Chat_Message.message == data).first()[0]
    db.session.commit()
    #db.session.add(
    #            "Username" + ": " + "message",
    #            db.session.query(models.CurrentUsers.id).filter(models.Chat_Message.username).first().id,
    #    )
    emit_all_messages()

#lst = {}
#all_users = []

#def emit_all_users(channel):
#    for users in lst:
#        all_users.append(lst[users])
#    socketio.emit(channel, {"all_users": all_users})

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/home')
def home():
    return flask.render_template('index.html')

@app.route('/room')
def room():
    emit_all_messages()
    return flask.render_template('index.html')

@app.route('/about')
def about():
    return flask.render_template('index.html')

#def get_room(client_sid):
#    models.db.session.add(models.CurrentUsers).filter_by(sid=client_sid).first().user
#    models.db.session.commit()

@app.route('/map')
def GoogleMap():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print("SID: " +str(flask.request.sid))
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
            profile_picture=profile_picture,
            followed_events=[],
            flags=models.UserPreferenceFlags.AllOff.value,
            interests=""
        )
        db.session.add(user)
        db.session.commit()

    socketio.emit("successful login", {
        "email": user.email,
        "name": user.name,
        "bio": user.bio,
        "profile_picture": user.profile_picture,
        "flags": user.flags,
        "interests": user.interests
    },
    room=flask.request.sid)

    emit_user_friends(FRIENDS_RECEIVED_CHANNEL, user.email)
    emit_user_friend_requests(FRIEND_REQUESTS_RECEIVED_CHANNEL, user.email)

@socketio.on("sending new event")
def create_event(data):
    attendees = list()
    print(data)
    attendees.append(db.session.query(models.User.email).filter(models.User.name == data["owner"]).first()[0])

    db.session.add(models.EventClass(data["owner"], data["title"], data["type"], data["location"], data["time"], \
                    data["description"], data["visibility"] == "Public", attendees, data["join"] == "Anyone can join"))
    db.session.commit()

    emit_all_events(EVENTS_RECEIVED_CHANNEL)
    emit_all_current_users(USERS_RECEIVED_CHANNEL)


@socketio.on("retrieve user info")
def get_info(data):
    name = db.session.query(models.User.name).filter(models.User.name == data).first()[0]
    email = db.session.query(models.User.email).filter(models.User.name == data).first()[0]
    picture = db.session.query(models.User.profile_picture).filter(models.User.name == data).first()[0]
    bio = db.session.query(models.User.bio).filter(models.User.name == data).first()[0]

    show_interests = db.session.query(models.User.flags).filter(models.User.name == data).first()[0]
    interests = "hidden"
    if models.UserPreferenceFlags.check_flags(show_interests, models.UserPreferenceFlags.ShowInterests):
        interests = db.session.query(models.User.interests).filter(models.User.name == data).first()[0]

    socketio.emit(flask.request.sid, {
        "name": name,
        "email": email,
        "picture": picture,
        "bio": bio,
        "interests": interests,
    })

@socketio.on("get current info")
def get_current_info(data):
    query_email = db.session.query(models.CurrentUsers.email).filter(models.CurrentUsers.client_socket_id == data).first()[0]
    send_name = db.session.query(models.User.name).filter(models.User.email == query_email).first()[0]
    send_email = db.session.query(models.User.email).filter(models.User.email == query_email).first()[0]
    send_picture = db.session.query(models.User.profile_picture).filter(models.User.email == query_email).first()[0]
    send_bio = db.session.query(models.User.bio).filter(models.User.email == query_email).first()[0]

    socketio.emit(flask.request.sid, {
        "send_name": send_name,
        "send_email": send_email,
        "send_picture": send_picture,
        "send_bio": send_bio
    })

@socketio.on("send bio")
def update_new_bio(data):
    query_email = db.session.query(models.CurrentUsers.email).filter(models.CurrentUsers.client_socket_id == data["currentSocket"]).first()[0]
    db.session.query(models.User).filter(models.User.email == query_email).update({"bio": data["newBio"]})
    db.session.commit()

@socketio.on("filter events")
def search_events(data):
    print("Searching for " + data["query"])
    print("filters " + str(data["filters"]))
    filters = list()
    for f in data["filters"]:
        filters.append(f['value'])

    queried_event_ids = [db_event.id for db_event in db.session.query(models.EventClass).filter( \
        (models.EventClass.event_owner.contains(data["query"])) | \
        (models.EventClass.event_title.contains(data["query"])) | \
        (models.EventClass.event_location.contains(data["query"])) | \
        (models.EventClass.event_description.contains(data["query"])))]

    filtered_event_ids = list()
    filtered_event_owners = list()
    filtered_event_titles = list()
    filtered_event_types = list()
    filtered_event_locations = list()
    filtered_event_times = list()
    filtered_event_descriptions = list()

    friends_list = list()

    requested_user = db.session.query(models.CurrentUsers).filter(models.CurrentUsers.client_socket_id == flask.request.sid).first()

    if data["owner"] == "Friends Events":
        friends_list += [db.session.query(models.User).filter(models.User.email == db_friendship.user2).first().name for db_friendship in db.session.query(models.Friends)\
                                                                .filter(models.Friends.user1 == requested_user.email).all()]
        friends_list += [db.session.query(models.User).filter(models.User.email == db_friendship.user1).first().name for db_friendship in db.session.query(models.Friends)\
                                                                .filter(models.Friends.user2 == requested_user.email).all()]

    print(friends_list)
    for event_id in queried_event_ids:
        event = db.session.query(models.EventClass).get(event_id)
        if data["owner"] == "My Events" and requested_user.name != event.event_owner:
            continue
        elif data["owner"] == "Friends Events" and event.event_owner not in friends_list:
            continue
        if event.event_type not in filters and len(filters) != 0:
            continue

        if not event.event_visibility and event.event_owner not in friends_list:
            continue

        filtered_event_ids.append(event.id)
        filtered_event_owners.append(event.event_owner)
        filtered_event_titles.append(event.event_title)
        filtered_event_types.append(event.event_type)
        filtered_event_locations.append(event.event_location)
        filtered_event_times.append(event.event_time)
        filtered_event_descriptions.append(event.event_description)

    socketio.emit(EVENTS_RECEIVED_CHANNEL, {
        "all_event_ids": filtered_event_ids,
        "all_event_owners": filtered_event_owners,
        "all_event_titles": filtered_event_titles,
        "all_event_types": filtered_event_types,
        "all_event_locations": filtered_event_locations,
        "all_event_times": filtered_event_times,
        "all_event_descriptions": filtered_event_descriptions
    }, room=flask.request.sid)

    print("sending filtered events to " + str(flask.request.sid))

def friend_request_exists(user1: str, user2: str) -> bool:
    friend_requests = []
    friend_requests += db.session   .query(models.Message.msg_id)\
                                    .filter(
                                        models.Message.to_user == user1,
                                        models.Message.from_user == user2,
                                        models.Message.msg_type == models.MessageType.FriendRequest
                                    )\
                                    .all()

    friend_requests += db.session   .query(models.Message.msg_id)\
                                    .filter(
                                        models.Message.to_user == user2,
                                        models.Message.from_user == user1,
                                        models.Message.msg_type == models.MessageType.FriendRequest
                                    )\
                                    .all()

    return len(friend_requests) > 0

def attend_request_exists(owner: str, attendee: str, event_id: int):
    owner_requests = db.session.query(models.Event_Requests).filter(models.Event_Requests.owner_email == owner).all()

    for request in owner_requests:
        if request.owner_email == owner and request.attendee_email == attendee and str(request.event_id) == str(event_id):
            return True

    return False


@socketio.on('send friend request')
def on_send_friend_request(data):
    print(data)
    to_user = data['user1']
    from_user = data['user2']
    print('on send friend request')

    if not friend_request_exists(to_user, from_user):
        db.session.add( models.Message(
            from_user=from_user,
            to_user=to_user,
            msg_type=models.MessageType.FriendRequest
        ))
        db.session.commit()

@socketio.on('send received friend requests')
def on_send_received_friend_requests(data):
    email = data['email']
    print('send received friend requests')
    emit_user_friend_requests(FRIEND_REQUESTS_RECEIVED_CHANNEL, email)

@socketio.on('reply friend request')
def on_reply_friend_request(data):
    from_email = data['from']
    to_email = data['to']
    accept = data['accept']

    if accept:
        db.session.add(models.Friends(
            user1=from_email,
            user2=to_email
        ))

    req = db.session  .query(models.Message)\
                .filter(
                    models.Message.msg_type == models.MessageType.FriendRequest,
                    models.Message.from_user == from_email,
                    models.Message.to_user == to_email)\
                .first()

    db.session.delete(req)
    db.session.commit()

    emit_user_friend_requests(FRIEND_REQUESTS_RECEIVED_CHANNEL, to_email)
    emit_user_friends(FRIENDS_RECEIVED_CHANNEL, to_email)
    emit_user_friends(FRIENDS_RECEIVED_CHANNEL, from_email)

@socketio.on("send follow")
def on_send_follow(data):
    print(data["followedEvents"])
    query_email = db.session.query(models.CurrentUsers.email).filter(models.CurrentUsers.client_socket_id == data["currentSocket"]).first()[0]

    followed_events = list()
    for event_type in data["followedEvents"]:
        followed_events.append(event_type["value"])

    db.session.query(models.User).filter(models.User.email == query_email).update({"followed_events": followed_events})
    db.session.commit()

@socketio.on("send attend event")
def on_send_attend_event(data):
    owner = db.session.query(models.User).get(data["owner"])
    user = db.session.query(models.User).get(data["user"])
    event = db.session.query(models.EventClass).get(data['id'])

    if event.event_join_type: #anyone can join
        curr_attendees = event.event_attendees
        if user.email not in curr_attendees:
            curr_attendees.append(user.email)

        print(curr_attendees)

        db.session.query(models.EventClass).filter(models.EventClass.id == data['id']).update({"event_attendees": curr_attendees})
        db.session.commit()
    else:
        if not attend_request_exists(owner.email, user.email, event.id) and user.email not in event.event_attendees:
            db.session.add(models.Event_Requests(owner.email, user.email, event.id))
            db.session.commit()

        owner_sid = db.session.query(models.CurrentUsers).filter(models.CurrentUsers.email == owner.email).first().client_socket_id
        # TODO notify owner?

    emit_all_events(EVENTS_RECEIVED_CHANNEL)

@socketio.on("get attend requests")
def on_retrieve_attend_requests(data):
    all_request_attendees = [db.session.query(models.User).get(db_event_request.attendee_email).name for db_event_request in db.session.query(models.Event_Requests)\
                            .filter(models.Event_Requests.owner_email == data['email']).all()]
    all_request_attendees_emails = [db_event_request.attendee_email for db_event_request in db.session.query(models.Event_Requests)\
                            .filter(models.Event_Requests.owner_email == data['email']).all()]
    all_request_event_titles = [db.session.query(models.EventClass).get(db_event_request.event_id).event_title for db_event_request in db.session.query(models.Event_Requests)\
                            .filter(models.Event_Requests.owner_email == data['email']).all()]
    all_request_event_ids = [db_event_request.event_id for db_event_request in db.session.query(models.Event_Requests)\
                            .filter(models.Event_Requests.owner_email == data['email']).all()]

    socketio.emit("receive attend requests", {
        "all_request_attendees": all_request_attendees,
        "all_request_attendees_emails": all_request_attendees_emails,
        "all_request_event_titles": all_request_event_titles,
        "all_request_event_ids": all_request_event_ids
    }, room=flask.request.sid)

@socketio.on("retrieve event attendees")
def on_retrieve_event_attendees(data):
    event = db.session.query(models.EventClass).get(data["id"])
    attendees = list()

    for i in range(1, len(event.event_attendees)):
        attendees.append(db.session.query(models.User).get(event.event_attendees[i]).name)

    socketio.emit("send event attendees", {
        "attendees": attendees
    }, room=flask.request.sid)

@socketio.on("reply attend request")
def on_reply_attend_request(data):
    event = db.session.query(models.EventClass).get(data["id"])
    user = db.session.query(models.User).get(data["from"])

    if data["accept"]:
        curr_attendees = event.event_attendees
        if user.email not in curr_attendees:
            curr_attendees.append(user.email)

        db.session.query(models.EventClass).filter(models.EventClass.id == data['id']).update({"event_attendees": curr_attendees})
        db.session.commit()

    req = db.session.query(models.Event_Requests).filter(models.Event_Requests.event_id == data["id"] and \
                                                         models.Event_Requests.owner_email == data["to"] and \
                                                         models.Event_Requests.attendee_email == data["from"]).first()

    db.session.delete(req)
    db.session.commit()


@socketio.on("show interests changed")
def on_show_interests_changed(data):
    email = data['email']
    show_interests = data['showInterests']

    user = db.session.query(models.User).get(email)
    user.flags = models.UserPreferenceFlags.toggle_flag(
        user.flags,
        models.UserPreferenceFlags.ShowInterests,
        show_interests
    )
    db.session.commit()

    print("show interests ==================", show_interests)
    socketio.emit('on show interests changed', {
        "email": email,
        "showInterests": show_interests,
    })

def emit_user_interests(channel, email):
    user = db.session.query(models.User).get(email)
    interests = user.interests.split(",")
    show_interests = models.UserPreferenceFlags.check_flags(
        user.flags,
        models.UserPreferenceFlags.ShowInterests)

    socketio.emit(channel, {
        "email": email,
        "interests": interests,
        "showInterests": show_interests
    })

@socketio.on("send interests")
def on_send_interests(data):
    print(data)
    email = data['email']
    emit_user_interests("get interests", email)

@socketio.on("update interests")
def on_update_interests(data):
    email = data['email']
    interests = data['interests']

    user = db.session.query(models.User).get(email)
    user.interests = interests
    db.session.commit()

    emit_user_interests("get interests", email)

@socketio.on("request all events")
def send_events_to_user():
    emit_all_events(EVENTS_RECEIVED_CHANNEL)

if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host = os.getenv("HOST", "0.0.0.0"),
        port = int(os.getenv("PORT", 8080))
    )
