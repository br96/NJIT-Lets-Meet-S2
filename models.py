import enum
from app import db
import flask_sqlalchemy

class MessageType(enum.IntEnum):
    FriendRequest = 1

class UserPreferenceFlags(enum.IntEnum):
    """ User Preferences Falgs - Each flag should be a power of 2 """
    """ Check for flags with bitwise operations """

    AllOff = 0
    ShowInterests = 1

    @staticmethod
    def toggle_flag(original: int, flag, turn_on: bool) -> int:
        if turn_on: return original | flag.value
        return original & ~flag.value

    @staticmethod
    def check_flags(original: int, flags: int) -> bool:
        return (original & flags) != 0

class EventClass(db.Model):
    __table_args__ = {'extend_existing': True} 
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
    __table_args__ = {'extend_existing': True} 

    id = db.Column(db.Integer)
    email = db.Column(db.String(1000), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.String(1024))
    profile_picture = db.Column(db.String(256))
    followed_events = db.Column(db.ARRAY(db.String(16)))
    flags = db.Column(db.Integer, default=UserPreferenceFlags.AllOff.value)
    interests = db.Column(db.String(1024)) #will be stored as comma separated values

    def __init__(self, email, name, bio, profile_picture, followed_events, flags, interests):
        self.email = email
        self.name = name
        self.bio = bio
        self.profile_picture = profile_picture
        self.followed_events = followed_events
        self.flags = flags
        self.interests = interests

class CurrentUsers(db.Model):
    __table_args__ = {'extend_existing': True} 
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
    __table_args__ = {'extend_existing': True} 
    friend_id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.String(1000), db.ForeignKey("users.email"))
    user2 = db.Column(db.String(1000), db.ForeignKey("users.email"))

    def __init__(self, user1, user2):
        self.user1 = user1
        self.user2 = user2

class Message(db.Model):
    __tablename__ = "messages"
    __table_args__ = {'extend_existing': True} 

    msg_id = db.Column(db.Integer, primary_key=True)
    from_user = db.Column(db.String(1000), nullable=False)
    to_user = db.Column(db.String(1000), nullable=False)
    msg_type = db.Column(db.Enum(MessageType))

    def __init__(self, from_user, to_user, msg_type):
        self.from_user = from_user
        self.to_user = to_user
        self.msg_type = msg_type

#class ChatUsers(db.Model):
     
#    id = db.Column(db.Integer, primary_key=True)
#    email = db.Column(db.String(1000), unique=True)
#    user = db.Column(db.String(1000), unique=True)
    
#    def __init__(self, email, user):
        
#        self.email = email
#        self.user = user

class Chat_Message(db.Model):
    __tablename__ = "message"
    __table_args__ = {'extend_existing': True} 
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    #email = db.Column(db.String(1000))
    message = db.Column(db.String(1000))
    #userID = db.Column(db.Integer, db.ForeignKey(CurrentUsers.id), nullable=False)

    def __init__(self, message):
        #self.username = username
        #self.email = email
        self.message = message
        #self.message_id = message_id
    
    def __repr__(self):
        return{
            "username": self.username,
            "message" : self.message,
            #'userid' : self.userID
        }

class Event_Requests(db.Model):
    __tablename__ = "event_requests"
    __table_args__ = {'extend_existing': True} 
    
    id = db.Column(db.Integer, primary_key=True)
    owner_email = db.Column(db.String(1000))
    attendee_email = db.Column(db.String(1000))
    event_id = db.Column(db.String(1000))
    
    def __init__(self, owner_email, attendee_email, event_id):
        self.owner_email = owner_email
        self.attendee_email = attendee_email
        self.event_id = event_id

db.create_all()
db.session.commit()
db.session.close()