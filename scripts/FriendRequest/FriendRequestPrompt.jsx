import React from 'react';
import {Socket} from '../Socket';

import {User} from '../User';
export function FriendRequestPrompt({owner, userEmail})
{``
    if(userEmail === User.current.email) return <div />;

    function sendFriendRequest()
    {
        Socket.emit('send friend request', {
            user1: owner,
            user2: User.current.email,
        });
    }

    return (
    <div className="friend-request-prompt" onClick={sendFriendRequest}>
        <img className="friend-request-icon" src="../static/img/friend-request.png" alt="friend-request-icon"/>
    </div>
    );
}
