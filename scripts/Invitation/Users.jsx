import * as React from 'react';
import { Socket } from '../Socket';

function Users(){
    
    const [users, setUsers] = React.useState([]);
    /*
    function getNewuser() {
        React.useEffect(() => {
            Socket.on('emit all users', updateUsers);
            return () => {
                Socket.off('emit all users', updateUsers);
            };
        });
    }
    
    function updateUsers(data) {
        console.log('Received new user: ' + data['all_users']);
        setUsers(data['all_users']);
    }
    
    getNewuser();
    */
    
    
     return (
         /*
         <div className="chat_users">
            <ul className="userList">
                {
                    users.map((user, index) =>
                            <li key={index}>User Name: {user}</li>)
                }
            </ul>
         </div>
         */
         <h1> hello world </h1>
         
         );
}

export default Users();