import React from 'react';

import {FriendRequestInbox} from './FriendRequestInbox';
export function FriendRequestInboxButton()
{
    const [showInbox, setShowInbox] = React.useState(false);

    function toggleInbox()
    {
        setShowInbox((show) => !show );
    }

    return (
    <div>
        <button className="ChatRoom friend-request-inbox-button" onClick={toggleInbox}>Received Friend Requests</button>
        { showInbox && <FriendRequestInbox /> }
    </div>
    );
}
