import React from 'react'
import { Socket } from './Socket';
import CurrentUser from './CurrentUser';

export default function CurrentUsersContainer() {
    const [currentUsers, setCurrentUsers] = React.useState([]);
    const [currentConnectionStatus, setCurrentConnectionStatus] = React.useState([]);
    const [currentUserEmails, setCurrentUserEmails] = React.useState([]);
    const [friends, setFriends] = React.useState([]);

    function updateUsersHistory(data) {
        console.log(data["all_current_user_emails"]);
        setCurrentUsers(data["all_current_user_names"]);
        setCurrentConnectionStatus(data["all_current_user_connection_status"]);
        setCurrentUserEmails(data["all_current_user_emails"]);
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
        let allFriends = data.friends;
        setFriends(() => {
            return allFriends.map((friend, index) => {
                return <CurrentUser 
                    key={index} 
                    name={friend.name} 
                    connectionStatus={friend.connection_status}
                    email={friend.email} />;
            });
        });
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
            <div className="current-user-container-header">Friends</div>
            {friends}
            <div className="current-user-container-header">Users</div>
            { currentUsers.map((currentUser, index) => (
                <CurrentUser 
                    key={index} 
                    name={currentUsers[index]} 
                    connectionStatus={currentConnectionStatus[index]}
                    email={currentUserEmails[index]}/>
            ))}
        </div>
    )
}
