import React from 'react';
import SendButton from './SendButton';
import { Socket } from '../Socket';

function Chatbox() {
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    function getNewMessage() {
        React.useEffect(() => {
            Socket.on('messages received', updateMessages);
            return () => {
                Socket.off('messages received', updateMessages);
            };
        });
    }

    function updateMessages(data) {
        console.log("Received messages from server: "+data['message']);
        setMessages(data['allMessages']);
        let chatBox = document.getElementById("box");
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getNewuser() {
        React.useEffect(() => {
            Socket.on('users received', updateUsers);
            return () => {
                Socket.off('users received', updateUsers);
            };
        });
    }

    function updateUsers(data) {
        console.log('Received new user: ' + data['all_users']);
        setUsers(data['all_users']);
    }

    getNewMessage();
    getNewuser();

    return (
        <div className="container" id="chatbox">
            <div className="chat_messages">
            <form>

                    <ul id="box" className="box">
                        {
                            messages.map((message, index) =>
                            <li key={index}>{message}</li>)
                        }
                    </ul>
            </form>
            </div>
            <div className="input_message">
            <SendButton />
            </div>
        </div>
        );
}

export default Chatbox;
