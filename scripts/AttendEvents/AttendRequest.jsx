import React from 'react';
import { Socket } from '../Socket';
import { User } from '../User';

export function AttendRequest({fromEmail})
{
    function replyAttendRequest(accept)
    {
        Socket.emit('reply attend request', {
            from: fromEmail,
            to: User.current.email,
            accept: accept,
        });
    }

    function acceptAttendRequest(event)     
    { 
        replyAttendRequest(true);  
        event.preventDefault();   
    }

    function declineAttendRequest(event)
    { 
        replyAttendRequest(false); 
        event.preventDefault();
    }

    return (
    <div className="attend-request">
        <span>{fromEmail} wants to attend your event</span>
        <div className="attend-request-options">
            <button onClick={acceptAttendRequest}>Accept</button>
            <button onClick={declineAttendRequest}>Decline</button>
        </div>
    </div>
    );
}
