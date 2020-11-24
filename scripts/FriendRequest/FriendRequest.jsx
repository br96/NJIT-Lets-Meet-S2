import React from 'react';
import { Socket } from '../Socket';
import { User } from '../User';

export function FriendRequest({fromEmail})
{
    function replyFriendRequest(accept)
    {
        Socket.emit('reply friend request', {
            from: fromEmail,
            to: User.current.email,
            accept: accept,
        });
    }

    function acceptFriendRequest(event)     
    { 
        replyFriendRequest(true);  
        event.preventDefault();   
    }

    function declineFriendRequest(event)
    { 
        replyFriendRequest(false); 
        event.preventDefault();
    }

    return (
    <div className="friend-request">
        <span>{fromEmail} sent you a friend request</span>
        <div className="friend-request-options">
            <button onClick={acceptFriendRequest}>Accept</button>
            <button onClick={declineFriendRequest}>Decline</button>
        </div>
    </div>
    );
}
