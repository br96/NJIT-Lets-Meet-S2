import React from 'react'
import { Socket } from './Socket';
import CurrentUser from './CurrentUser';

export default function CurrentUsersContainer() {
    const [currentUsers, setCurrentUsers] = React.useState([]);
    const [currentConnectionStatus, setCurrentConnectionStatus] = React.useState([])

    function updateUsersHistory(data) {
        console.log(data["all_current_user_names"])
        setCurrentUsers(data["all_current_user_names"])
        setCurrentConnectionStatus(data["all_current_user_connection_status"])
    }

    function getUsersHistory() {
        React.useEffect(() => {
            Socket.on("emit all users", updateUsersHistory);
            return () => {
                Socket.off("emit all users", updateUsersHistory);
            };
        })
    }

    getUsersHistory();

    function updateFriends(data)
    {
        console.log("get all friends " + data);
    }

    function getFriends() {
        React.useEffect(() => {
            Socket.on("emit all friends", updateFriends);
            return () => Socket.off('emit all friends', updateFriends);
        }, []);
    }
    getFriends();

    return (
        <div>
            { currentUsers.map((currentUser, index) => (
               <CurrentUser key={index} name={currentUsers[index]} connectionStatus={currentConnectionStatus[index]}/>
            ))}
        </div>
    )
}
