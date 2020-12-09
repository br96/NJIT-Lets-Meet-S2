import * as React from 'react';
import { Socket } from '../Socket';

export default function EventAttendees() {
  const [eventAttendees, setEventAttendees] = React.useState([]);

  function updateEventAttendees(data) {
    setEventAttendees(data.attendees);
  }

  Socket.on('send event attendees', updateEventAttendees);

  const attendeeList = eventAttendees.map((attendee) => (
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
