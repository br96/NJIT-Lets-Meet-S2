import React from 'react';

export function FriendRequestPrompt({userEmail})
{
    function sendFriendRequest()
    {
        console.log(userEmail);
    }

    return (
    <div className="friend-request-prompt" onClick={sendFriendRequest}>
        Send Friend Request
    </div>
    );
}
