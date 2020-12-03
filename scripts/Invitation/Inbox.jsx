import React from 'react';
import SendButton from './SendButton';
import { Socket } from '../Socket';

function Chatbox() {
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    
    function getNewMessage() {
        React.useEffect(() => {
            Socket.on('messages received', (data) => {
                setMessages(data.allMessages);
                
                const chatBox = document.getElementById("chatbox");
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        });
        
        React.useEffect(() => {
           Socket.on('sending message history',(data) => {
            setMessages(data.allMessages);
            const chatBox = document.getElementById('chatbox');
            chatBox.scrollTop = chatBox.scrollHeight;
            });
        });
    }
    function updateMessages(data) {
        //console.log("Received messages from server: " + data['allMessages']);

        setMessages(data['allMessages']);
        let chatBox = document.getElementById("box");
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    getNewMessage()
    
    return (
        <div className="container" id="chatbox">
            <div className="chat_messages">
            <form>
                    <ul className="box">
                        {
                            messages.map((message, index) =>
                            <li key={index}>{message}</li>)
                        }
                    </ul>
                    <SendButton />
            </form>
            </div>
        </div>
        )
}

export default Chatbox;