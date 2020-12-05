import React from 'react';
import {Socket} from '../Socket';

import { User } from '../User';
import {AttendRequest} from './AttendRequest';
export function AttendRequestInbox()
{
    const [attendRequests, setAttendRequests] = React.useState([]);

    function extractAttendRequestsFromArray(requests)
    {
        if(requests.length === 0) return <p>Attend requests inbox is empty</p>;
        return requests.map((req, index) => {
            return <AttendRequest key={index} fromEmail={req.from} />;
        });
    }

    function onReceiveAttendRequests(data)
    {
        let requests = data['requests'];
        setAttendRequests(() => extractAttendRequestsFromArray(requests));
    }

    function getAttendRequests()
    {
        React.useEffect(() => {
            let channel = 'receive attend requests';
            Socket.on(channel, onReceiveAttendRequests);
            
            Socket.emit('send received attend requests', {
                email: User.current.email
            });
        }, []);

    }
    getAttendRequests();

    return (
    <div className="attend-request-inbox">
        {attendRequests}
    </div>
    );
}
