import unittest
from dotenv import load_dotenv
from unittest.mock import patch

def mocked_db_create_all(flaskapp):
    pass

with patch('flask_sqlalchemy.SQLAlchemy.create_all', mocked_db_create_all):
    # from app import socketio
    import app
    import models

class MockedQuery:
    def all(self):
        return []

    def get(self, obj_id):
        return obj_id

    def filter(self, *args):
        return self

    def first(self):
        return [self]

class MockedFlaskRequest:
    sid = 0
    def __init__(self):
        self.sid = 0

class TestApp(unittest.TestCase):
    def setUp(self):
        self.create_event_mock_args = [
            {
                "input": {
                    "owner": "owner",
                    "title": "title",
                    "type": "type",
                    "location": "location",
                    "time": "time",
                    "description": "description",
                    "visibility": "Public",
                    "join": "Anyone can join"
                }
            }
        ]

        self.google_login_mock_args = [
            {
                "input": {
                    "token": {
                        "aud": ""
                    }
                }
            },
            {
                "input": {
                    "token": "error"
                }
            },
            {
                "input": {
                    "token": {
                        # this one hass to be the google client we are using in the server
                        "aud": "163716708396-talgj01aee74s8l35iv4opmpac915v0g.apps.googleusercontent.com",
                        "email": "email@gmail.com",
                        "name": "a user name",
                        "picture": "doesn't matter"
                    }
                }
            },
            {
                "input": {
                    "token": {
                        # this one hass to be the google client we are using in the server
                        "aud": "163716708396-talgj01aee74s8l35iv4opmpac915v0g.apps.googleusercontent.com",
                        "email": "",
                        "name": "",
                        "picture": ""
                    }
                }
            }
        ]

    def db_commit_mock(self):
        pass

    def db_query_mock(self, something):
        return MockedQuery()

    def test_example(self):
        for test in self.create_event_mock_args:
            with patch('sqlalchemy.orm.session.Session.commit', self.db_commit_mock):
                with patch('sqlalchemy.orm.session.Session.query', self.db_query_mock):
                        app.create_event(test["input"])

    def mocked_google_verify_token(self, token, request, client_id):
        if token == "error": raise Exception()
        return token

    def mocked_query_get_google_login(self, email):
        if len(email) <= 0: return None
        return models.User(
            email=email,
            name="a user name",
            bio="",
            profile_picture="doesn't matter",
            followed_events=[],
            flags=0,
            interests=""
        )



    def test_google_login(self):
        for test in self.google_login_mock_args:
            with patch('sqlalchemy.orm.session.Session.commit', self.db_commit_mock):
                with patch('sqlalchemy.orm.session.Session.query', self.db_query_mock):
                    with patch('google.oauth2.id_token.verify_oauth2_token', self.mocked_google_verify_token):
                        with patch('__main__.MockedQuery.get', self.mocked_query_get_google_login):
                            with patch('flask.request', MockedFlaskRequest):
                                app.on_google_login(test["input"])

class TestSocketIO(unittest.TestCase):
    def setUp(self):
        self.connect_user_mock = [
            {
                "data": {
                    "socketID": "socketid",
                    "name": "name"
                }
            }
        ]

    # def test_connect(self):
    #     client1 = socketio.test_client(app.app)
    #     client2 = socketio.test_client(app.app)
    #     self.assertTrue(client1.is_connected())
    #     self.assertTrue(client2.is_connected())
    #     self.assertNotEqual(client1.sid, client2.sid)

    # def test_disconnect(self):
    #     client = socketio.test_client(app.app)
    #     client.disconnect()

    # def test_emit(self):
    #     socketio_test_client = socketio.test_client(app.app)
    #     for test in self.connect_user_mock:
    #         app.connect_user_id(test["data"])
    #         self.assertTrue(socketio_test_client.is_connected())


class LocationResponse:
    def __init__(self, location):
        self.location = location

class TimeResponse:
    def __init__(self, time):
        self.time = time

class DescriptionResponse:
    def __init__(self, description):
        self.description = description

if __name__ == "__main__":
    unittest.main()