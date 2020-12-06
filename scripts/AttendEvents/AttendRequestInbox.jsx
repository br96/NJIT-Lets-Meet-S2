import React from 'react';
import {Socket} from '../Socket';

import { User } from '../User';
import {AttendRequest} from './AttendRequest';
export function AttendRequestInbox()
{
    const [attendRequestAttendees, setAttendRequestAttendees] = React.useState([]);
    const [attendRequestEmails, setAttendRequestEmails] = React.useState([]);
    const [attendRequestEventTitles, setAttendRequestEventTitles] = React.useState([]);
    const [attendRequestEventIds, setAttendRequestEventIds] = React.useState([]);

    function onReceiveAttendRequests(data)
    {
        setAttendRequestAttendees(data.all_request_attendees);
        setAttendRequestEmails(data.all_request_attendees_emails);
        setAttendRequestEventTitles(data.all_request_event_titles);
        setAttendRequestEventIds(data.all_request_event_ids);
    }

    function getAttendRequests()
    {
        React.useEffect(() => {
            let channel = 'receive attend requests';
            Socket.on(channel, onReceiveAttendRequests);
            
            Socket.emit('get attend requests', {
                email: User.current.email
            });
        }, []);

    }
    getAttendRequests();

    if(attendRequestAttendees.length === 0) return <div className="attend-request-inbox"><p>Attend request inbox is empty</p></div>;
        return attendRequestAttendees.map((attendee, index) => {
            return (
                <div className="attend-request-inbox">
                    <AttendRequest 
                        key={index} 
                        attendee={attendee} 
                        fromEmail={attendRequestEmails[index]} 
                        title={attendRequestEventTitles[index]} 
                        id={attendRequestEventIds[index]} 
                    />
                </div>
            );
        });
}
