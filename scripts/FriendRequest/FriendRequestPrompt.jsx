import React from 'react';
import {Socket} from '../Socket';

import {User} from '../User';
export function FriendRequestPrompt({userEmail})
{
    if(userEmail === User.current.email) return <div />;

    function sendFriendRequest()
    {
        Socket.emit('send friend request', {
            user1: userEmail,
            user2: User.current.email,
        });
    }

    return (
    <div className="friend-request-prompt" onClick={sendFriendRequest}>
        Send Friend Request
    </div>
    );
}