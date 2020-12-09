import React from 'react';
import { Socket } from './Socket';
import CurrentUser from './CurrentUser';

export default function CurrentUsersContainer() {
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [currentConnectionStatus, setCurrentConnectionStatus] = React.useState([]);
  const [currentUserEmails, setCurrentUserEmails] = React.useState([]);
  const [friendComponents, setFriendComponents] = React.useState([]);
  const [friends, setFriends] = React.useState(new Set());

  function updateUsersHistory(data) {
    setCurrentUsers(data.all_current_user_names);
    setCurrentConnectionStatus(data.all_current_user_connection_status);
    setCurrentUserEmails(data.all_current_user_emails);
  }

  function getUsersHistory() {
    React.useEffect(() => {
      Socket.on('emit all users', updateUsersHistory);
      return () => {
        Socket.off('emit all users', updateUsersHistory);
      };
    });
  }
  getUsersHistory();

  function updateFriends(data) {
    const allFriends = data.friends;

    setFriends(() => new Set(allFriends.map((friend) => friend.email)));

    setFriendComponents(() => allFriends.map((friend, index) => (
      <CurrentUser
        key={index}
        name={friend.name}
        connectionStatus={friend.connection_status}
        email={friend.email}
        showFriendRequest={false}
      />
    )));
  }

  function getFriends() {
    React.useEffect(() => {
      Socket.on('emit all friends', updateFriends);
      return () => Socket.off('emit all friends', updateFriends);
    }, []);
  }
  getFriends();

  return (
    <div className="all-users-container">
      <div className="all-friends-container">
        <div className="current-user-container-header">Friends</div>
        <div className="all-friends-div">
          {friendComponents}
        </div>
      </div>
      <div className="all-current-users-container">
        <div className="current-user-container-header">Users</div>
        <div className="current-all-users-container-div">
          { currentUsers.map((currentUser, index) => {
            const email = currentUserEmails[currentUsers.length - index - 1];
            const showFriendRequest = !friends.has(email);
            return (
              <CurrentUser
                key={currentUsers.length - index - 1}
                name={currentUsers[currentUsers.length - index - 1]}
                connectionStatus={currentConnectionStatus[currentUsers.length - index - 1]}
                email={email}
                showFriendRequest={showFriendRequest}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
