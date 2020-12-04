import * as React from 'react';

export default function ExpandedEvent({
  // eslint-disable-next-line react/prop-types
  type, location, time, description, email
}) {
  
  return (
    <div className="expanded-event">
      <h1>
        Type:
        {type}
      </h1>
      <h3>
        Location:
        {location}
      </h3>
      <h3>
        Time:
        {time}
      </h3>
      <h4>
        Details:
        {description}
      </h4>
      <h5>Attendees:</h5>
      <EventAttendees />
    </div>
  );
}
