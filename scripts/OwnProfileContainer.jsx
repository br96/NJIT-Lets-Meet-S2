import React from 'react'
import { Socket } from './Socket';

export default function CurrentUsersContainer() {
    const [toggle, setToggle] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});

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
        <div>

        </div>
    )
}
