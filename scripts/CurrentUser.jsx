import * as React from 'react';

import {FriendRequestPrompt} from './FriendRequest/FriendRequestPrompt';
export default function CurrentUser({name, connectionStatus, email}) {
    const [showFriendRequestPrompt, setShowFriendRequestPrompt] = React.useState(false);

    function toggleFriendRequestPrompt(event)
    {
        setShowFriendRequestPrompt( (show) => !show );
    }

    return (
        <div>
            <div className="current-user-display" onClick={toggleFriendRequestPrompt}>
                <div className='current-user-name'>{name}</div>
                <div className="current-user-options">
                    <FriendRequestPrompt userEmail={email} />
                    <div id={connectionStatus}></div>
                </div>
            </div>
        </div>
    )
}
