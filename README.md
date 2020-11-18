# https://njit-lets-meet.herokuapp.com

# Dependencies
## pip Packages
1. python-dotenv
2. eventlet
3. flask
4. flask-socketio
5. psycopg2-binary
6. flask-sqlalchemy
7. google-auth
8. requests

# Brian
**Tasks:**
**Single Event / Sessions**
The purpose of this task was to allow a user to broadcast an event publicly with relevant information such as the title, owner, description, time, and location of the event through the use of a Form.  This information was stored in the Event_Class table within the database accordingly.

**Multiple Event / Sessions**
This was only possible when the previous task was completed.  Every tasks that was added into the database had to be emitted publicly to all users connected.  This was done by querying the necessary information from the database, and emitting the pulled information on a global channel via sockets.  The information was then propagated accordingly in order to display the event information to the user.

**Basic Styling**
This was just a quick mockup in order to get a good idea of how we'll want the app to eventually look.  The main purpose of this was to dictate shape and size of components on the screen.

# Luis
**Tasks:**
**Profile Page**
The purpose of this task was to allow the client to view a user's information. This works as a view that displays a user's name, email, bio information and profile picture.

**Unit Tests**
Create unit tests for when a client creates a new event and the second half of when the user tries to log in using google oauth.

**Unique ID per Oauth**
The purpose of this task was to link a new google oauth login to a unique ID so the user information would persist for each user whenever they logged in with the same email.

# Chris
**Tasks:**
**Front Page with Oauth Button -> Route to Main Page**
The purpose of this task is to make the login page the landing page. On successful login, route user to the main page where the app is

**Linting**
Basic linting onto app.py. Include .pylintrc, run `pip install pylint_flask_sqlalchemy` and run `pylint --load-plugins pylint_flask_sqlalchemy app.py`

# Chang
**Tasks:**
**Database Table**
The purpose of this task is to make the login page database information and adding event class database stored in the database Table.