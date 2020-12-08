import * as React from 'react';
import Notification from './Notification';
import Inbox from './Invitation/Inbox';
import { Socket } from './Socket';
import {Redirect} from 'react-router-dom';
import User from './User';

import './App.css';
export function Room() {
    // let status;
    // Socket.on('not logged in', (data) => {
    //     console.log("222222");
    //     status = data['test'];
    // });
    // console.log(status);
    return(
        <div className="chat-container">
            <div className="chat-header"> 
            <h1 className="Roompage">Welcome to the Chat Page</h1>
            </div>
            <div className="content-room">
            <Notification />
            <a href="/home">
            <button type="button" className="leave">Leave Room</button>
            </a>
            </div>
        <main className = "chat-main">
            <div className="chat-message">
                <Inbox />
            </div>
        </main>
        </div>
        
    );
}

 //           <div className = "chat-sidebar">
 //               <h3 className="room_name"> Room Name: </h3>
 //               <h2 id="room_id"> </h2>
 //               <h3 className="room_users"> Users: </h3>
 //          </div>