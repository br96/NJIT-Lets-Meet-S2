import React from 'react';

export function FriendRequest({fromEmail})
{
    return (
    <div className="friend-request">
        <span>{fromEmail} sent you a friend request</span>
        <div className="friend-request-options">
            <button>Accept</button>
            <button>Decline</button>
        </div>
    </div>
    );
}
