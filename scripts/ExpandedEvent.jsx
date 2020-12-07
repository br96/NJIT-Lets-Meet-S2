import * as React from 'react';
import {EventAttendees} from './AttendEvents/EventAttendees';

export default function ExpandedEvent({
  // eslint-disable-next-line react/prop-types
  type, location, time, description, email
}) {

  return (
    <div className="expanded-event">
      <h1 className="event-typing-family">
        Type: {type}
      </h1>
      <h3 className="event-typing-family">
        Location: {location}
      </h3>
      <h3 className="event-typing-family">
        Time: {time}
      </h3>
      <h4 className="event-typing-family">
        Details: {description}
      </h4>
      <h5 className="event-typing-family">Attendees: </h5>
      <EventAttendees />
    </div>
  );
}
