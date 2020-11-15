import * as React from 'react';
import { Socket } from './Socket';

export default function EventForm() {
  const eventTypeReference = React.useRef();
  const locationReference = React.useRef();
  const timeReference = React.useRef();
  const descriptionReference = React.useRef();
  const titleReference = React.useRef();

  let oauthName = '';

  function sendNewEvent(e) {
    Socket.emit('sending new event', {
      owner: oauthName,
      title: titleReference.current.value,
      type: eventTypeReference.current.value,
      location: locationReference.current.value,
      time: timeReference.current.value,
      description: descriptionReference.current.value,
    });
    e.preventDefault();
  }

  React.useEffect(() => {
    Socket.on(Socket.id, (data) => {
      oauthName = data.name;
    });
  });

  return (
    <div>
      <form className="event-form" onSubmit={sendNewEvent}>
        <input className="title-container" placeholder="Title for event" type="text" ref={titleReference} />
        <select className="type-select-container" name="event-type" ref={eventTypeReference}>
          <option value="Study">Study</option>
          <option value="Hangout">Hangout</option>
        </select>
        <input className="location-input-container" type="text" placeholder="Enter a location..." ref={locationReference} />
        <input className="time-input-container" placeholder="12:00 PM" type="time" min="00:00" max="23:59" ref={timeReference} />
        <input className="text-area-container" placeholder="Description: Limit to 255 characters" type="text" ref={descriptionReference} />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}
