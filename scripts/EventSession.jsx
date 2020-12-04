import * as React from 'react';
import { Socket } from './Socket';
import ExpandedEvent from './ExpandedEvent';
import ProfileBR from './ProfileBR';

export default function EventSession({
  // eslint-disable-next-line react/prop-types
  owner, title, type, location, time, description, id
}) {
  const [toggle, setToggle] = React.useState(false);
  const [userClicked, setUserClicked] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({});

  function toggleExpandedEvent(e) {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
<<<<<<< HEAD
      Socket.emit("retrieve event attendees", {
        id: id,
      });
=======
>>>>>>> f950c755ef5d5ca4c06503b3045078df39088eae
    }
  }

  function toggleUserClicked(e) {
    if (userClicked) {
      setUserClicked(false);
    } else {
      setUserClicked(true);
      Socket.emit("retrieve user info", e.target.innerHTML);
      getUserInfo();
    }
  }

  function updateUserInfo(data) {
    setUserInfo({
      "name": data["name"],
      "email": data["email"],
      "picture": data["picture"],
      "bio": data["bio"]
    });
    console.log(data);
  }

  function getUserInfo() {
    Socket.on(Socket.id, updateUserInfo);
    return () => {
      Socket.off(Socket.id, updateUserInfo);
    };
  }

  return (
    <div className="event-session-container">
      <div className="event-session" >
        <p className="title" onClick={toggleExpandedEvent}>
          {title}
        </p>
        <p className="owner" onClick={toggleUserClicked}>
          {owner}
        </p>
      </div>
      {toggle ? (
        <ExpandedEvent
          type={type}
          location={location}
          time={time}
          description={description}
        />
      ) : null}
      {userClicked ? (<ProfileBR name={userInfo.name} email={userInfo.email} picture={userInfo.picture} bio={userInfo.bio} id={id} />) : null}
    </div>
  );
}
