import * as React from 'react';
import { Socket } from './Socket';

export default function OwnProfile() {

    const [userInfo, setUserInfo] = React.useState({});
    const [shouldUpdateBio, setShouldUpdateBio] = React.useState(false);

    const bioReference = React.useRef();

    function updateUserInfo(data) {
        setUserInfo({
          "name": data["send_name"],
          "email": data["send_email"],
          "picture": data["send_picture"],
          "bio": data["send_bio"]
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

    return (
        <div className="own-profile-shown">
            <img src={userInfo.picture} alt="profile-picture"/>
            <h1>{userInfo.name}</h1>
            <h3>{userInfo.email}</h3>
            <div className="bio-container"><h3>{userInfo.bio}</h3><button onClick={updateBio}>Update Bio</button></div>
            { shouldUpdateBio ? <div className="update-bio-container"><input className="new-bio" type="text" placeholder="enter new bio info..." ref={bioReference}></input><button onClick={sendBio}>Submit Bio</button></div> : null}
        </div>
    )
}
