import * as React from 'react';

export function EventAttendees({attendees}){
    const attendeeList = attendees.map((attendee, index) => (
       <div className="attendee-list">
            <li key={attendee} className="attendee">{attendee}</li>
       </div>
    ));
    return (
        <div className="event-attendees">
            <ul className="event-attendees">{attendeeList}</ul>
        </div>
    );
}