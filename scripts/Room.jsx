import * as React from 'react';
import Notification from './Notification';
import Inbox from './Invitation/Inbox';

import './App.css';

export function Room() {
    
    return(
        
        <div className="chat-container">
            <header className="chat-header"> 
            <h1 className="Roompage">Welcome to the Chat Page</h1>
            <Notification />
            </header>
            <div className="content-room">
            <a href="/home">
            <button type="button" className="leave">Leave Room</button>
            </a>
            </div>
        <main class = "chat-main">
            <div className = "chat-sidebar">
                <h3 className="room_name"> Room Name: </h3>
                <h2 id="room_id"> </h2>
                <h3 className="room_users"> Users: </h3>
            </div>
            <div class="chat-message">
                <Inbox />
            </div>
        </main>
        </div>
        
        );
}