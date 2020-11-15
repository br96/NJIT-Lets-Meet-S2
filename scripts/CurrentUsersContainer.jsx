import React from 'react'
import { Socket } from './Socket';
import CurrentUser from './CurrentUser';

export default function CurrentUsersContainer() {
    const [currentUsers, setCurrentUsers] = React.useState([]);

    function updateUsersHistory(data) {
        setCurrentUsers(currentUsers => [...currentUsers, {
            "name": data["name"],
            "connectionStatus": data["connection_status"]
        }])
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

    return (
        <div>
            { currentUsers.map((currentUser, index) => (
               <CurrentUser key={index} name={currentUser.name} connectionStatus={currentUser.connectionStatus}/>
            ))}
        </div>
    )
}
