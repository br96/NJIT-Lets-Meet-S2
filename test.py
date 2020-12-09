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

    def __init__(self, data_type):
        self.data_type = data_type

    def all(self):
        return []

    def get(self, obj_id):
        return obj_id

    def filter(self, *args):
        return self

    def first(self):
        val = (type(self.data_type.type)().python_type)
        print("type:", val())
        return [val()]

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

        self.get_info_args = [
            {
                "input": "my name"
            }
        ]

        self.search_events_args = [
            {
                "input": {
                    "query": "",
                    "filters": [],
                    "owner": ""
                }
            }
        ]

        self.search_events_reps = 0

    def db_commit_mock(self):
        pass

    def db_query_mock(self, something):
        return MockedQuery(something)

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

    def test_get_info(self):
        for test in self.get_info_args:
            with patch('sqlalchemy.orm.session.Session.query', self.db_query_mock):
                with patch('app.flask.request', MockedFlaskRequest):
                    app.get_info(test["input"])
                    app.get_current_info(test["input"])

    # def mocked_search_events_db_filter(self, *args):
    #     self.search_events_reps += 1
    #     if self.search_events_reps == 1:
    #         return [models.EventClass(
    #             event_owner="event_owner",
    #             event_title = "event_title",
    #             event_type = "event_type",
    #             event_location = "event_location",
    #             event_time = "event_time",
    #             event_description = "event_description",
    #             event_visibility = "event_visibility",
    #             event_attendees = "event_attendees",
    #             event_join_type = "event_join_type"
    #         )]
    #     return MockedQuery(models.CurrentUsers)

    # def test_search_events(self):
    #     for test in self.search_events_args:
    #         with patch('sqlalchemy.orm.Query.filter', self.mocked_search_events_db_filter):
    #             with patch('app.flask.request', MockedFlaskRequest):
    #                 app.search_events(test["input"])


if __name__ == "__main__":
    unittest.main()