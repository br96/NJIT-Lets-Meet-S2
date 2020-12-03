import React from 'react';
import {Socket} from '../Socket';

import {User} from '../User';
export function AttendEventPrompt({email, id})
{
    if(email === User.current.email) return <div />;
    
    function sendAttendEvent(event){
        event.preventDefault;

        Socket.emit('send attend event', {
            owner: email,
            user: User.current.email,
            id: id
        });
    }
    
    return (
        <button className="attend-event-button" onClick={sendAttendEvent}>Attend Event</button>
    );
}
