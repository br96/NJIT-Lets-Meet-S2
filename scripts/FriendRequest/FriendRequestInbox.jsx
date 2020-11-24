import React from 'react';
import {Socket} from '../Socket';

import { User } from '../User';
import {FriendRequest} from './FriendRequest';
export function FriendRequestInbox()
{
    const [friendRequests, setFriendRequests] = React.useState([]);

    function extractFriendRequestsFromArray(requests)
    {
        if(requests.length === 0) return <p>Friend requests inbox is empty</p>;
        return requests.map((req, index) => {
            return <FriendRequest key={index} fromEmail={req.from} />;
        });
    }

    function onReceiveFriendRequests(data)
    {
        let requests = data['requests'];
        setFriendRequests(() => extractFriendRequestsFromArray(requests));
    }

    function getFriendRequests()
    {
        React.useEffect(() => {
            let channel = 'receive friend requests';
            Socket.on(channel, onReceiveFriendRequests);
        }, []);

        Socket.emit('send received friend requests', {
            email: User.current.email
        });
    }
    getFriendRequests();

    return (
    <div className="friend-request-inbox">
        {friendRequests}
    </div>
    );
}
