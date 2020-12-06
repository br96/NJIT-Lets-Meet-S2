import React, { useState } from "react";
import { Socket } from './Socket';
import MultiSelect from "react-multi-select-component";

import {UpdateInterestsUI} from './UpdateInterestsUI';
export default function OwnProfile() {

    const [userInfo, setUserInfo] = React.useState({});
    const [shouldUpdateBio, setShouldUpdateBio] = React.useState(false);
    const [shouldUpdateFollow, setShouldUpdateFollow] = React.useState(false);
    const [shouldUpdateInterests, setShouldUpdateInterests] = React.useState(false);

    const bioReference = React.useRef();

    const options = [
        { label: "Study", value: "Study" },
        { label: "Hangout", value: "Hangout"}
    ];
    const [selected, setSelected] = useState([]);

    function updateUserInfo(data) {
        setUserInfo({
          "name": data["send_name"],
          "email": data["send_email"],
          "picture": data["send_picture"],
          "bio": data["send_bio"],
        },
        console.log(data));
      }

    function getUserInfo() {
        React.useEffect(() => {
            Socket.on(Socket.id, updateUserInfo);
            return () => {
                Socket.off(Socket.id, updateUserInfo);
            };
        })
    }

    function updateBio() {
        if (shouldUpdateBio) {
            setShouldUpdateBio(false);
        }
        else {
            setShouldUpdateBio(true);
        }
    }

    getUserInfo();

    function sendBio() {
        Socket.emit("send bio", {
            "currentSocket": Socket.id,
            "newBio": bioReference.current.value
        });
    }

    function updateFollow() {
        if (shouldUpdateFollow) {
            setShouldUpdateFollow(false);
        }
        else {
            setShouldUpdateFollow(true);
        }
    }

    function sendFollow(event) {
        event.preventDefault();
        console.log("send follow");

        Socket.emit("send follow", {
            "currentSocket": Socket.id,
            "followedEvents": selected
        });
    }

    function onUpdateInterestsClicked()
    {
        setShouldUpdateInterests((show) => !show);
    }

    return (
        <div className="own-profile-shown">
            <img className="pfp-own-profile" src={userInfo.picture} alt="profile-picture"/>
            <h1 className="pfp-content">{userInfo.name}</h1>
            <h3 className="pfp-content">{userInfo.email}</h3>
            <div className="bio-container"><h3>{userInfo.bio}</h3><button className="profile-button" onClick={updateBio}>Update Bio</button></div>
            { shouldUpdateBio ? <div className="update-bio-container"><input className="new-bio" type="text" placeholder="enter new bio info..." ref={bioReference}></input><button className="profile-button" onClick={sendBio}>Submit Bio</button></div> : null}
            <div className="follow-container"><button className="profile-button" onClick={updateFollow}>Update Followed Events</button></div>
            { shouldUpdateFollow ? <div className="update-follow-container"><form className="follow-form" onSubmit={sendFollow}><MultiSelect options={options} value={selected} onChange={setSelected} hasSelectAll={ false } /><button className="profile-button" type="submit">Submit</button></form></div> : null}
            <button className="profile-button" onClick={onUpdateInterestsClicked}>Update Interests</button>
            { shouldUpdateInterests && <UpdateInterestsUI email={userInfo.email} /> }
        </div>
    );
}
