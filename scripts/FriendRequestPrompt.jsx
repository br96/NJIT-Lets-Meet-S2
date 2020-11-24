import React from 'react';

import {User} from './User';
export function FriendRequestPrompt({userEmail})
{
    if(userEmail === User.current.email) return <div />;

    function sendFriendRequest()
    {
        
    }

    return (
    <div className="friend-request-prompt" onClick={sendFriendRequest}>
        Send Friend Request
    </div>
    );
}
