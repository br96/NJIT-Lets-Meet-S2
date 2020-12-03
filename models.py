import enum
from app import db
import flask_sqlalchemy

class MessageType(enum.Enum):
    FriendRequest = 1

class EventClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_owner = db.Column(db.String(64))
    event_title = db.Column(db.String(32))
    event_type = db.Column(db.String(16))
    event_location = db.Column(db.String(64))
    event_time = db.Column(db.String(16))
    event_description = db.Column(db.String(300))
    event_visibility = db.Column(db.Boolean()) # True = Public
    event_attendees = db.Column(db.ARRAY(db.String(1000)))
    event_join_type = db.Column(db.Boolean()) # True = Anyone can join

    def __init__(self, event_owner, event_title, event_type, event_location, event_time, event_description, event_visibility, event_attendees, event_join_type):
        self.event_owner = event_owner
        self.event_title = event_title
        self.event_type = event_type
        self.event_location = event_location
        self.event_time = event_time
        self.event_description = event_description
        self.event_visibility = event_visibility
        self.event_attendees = event_attendees
        self.event_join_type = event_join_type

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer)
    email = db.Column(db.String(1000), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.String(1024))
    profile_picture = db.Column(db.String(256))
    followed_events = db.Column(db.ARRAY(db.String(16)))

    def __init__(self, email, name, bio, profile_picture, followed_events):
        self.email = email
        self.name = name
        self.bio = bio
        self.profile_picture = profile_picture
        self.followed_events = followed_events

class CurrentUsers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(1000))
    client_socket_id = db.Column(db.String(128))
    connection_status = db.Column(db.String(7))

    def __init__(self, name, email, client_socket_id, connection_status):
        self.name = name
        self.email = email
        self.client_socket_id = client_socket_id
        self.connection_status = connection_status

class Friends(db.Model):
    friend_id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.String(1000), db.ForeignKey("users.email"))
    user2 = db.Column(db.String(1000), db.ForeignKey("users.email"))

    def __init__(self, user1, user2):
        self.user1 = user1
        self.user2 = user2

class Message(db.Model):
    __tablename__ = "messages"

    msg_id = db.Column(db.Integer, primary_key=True)
    from_user = db.Column(db.String(1000), nullable=False)
    to_user = db.Column(db.String(1000), nullable=False)
    msg_type = db.Column(db.Enum(MessageType))

    def __init__(self, from_user, to_user, msg_type):
        self.from_user = from_user
        self.to_user = to_user
        self.msg_type = msg_type

class Chat_Message(db.Model):
    __tablename__ = "message"
    
    id = db.Column(db.Integer, primary_key=True)
    #msg_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(1000), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    #msg_type = db.Column(db.Enum(MessageType))
    #sid = db.Column(db.String(120))

    def __init__(self, sid, user_name, message):
        self.sid = sid
        self.user_name = user_name
        self.message = message
        #self.msg_type = msg_type

db.create_all()
db.session.commit()
db.session.close()