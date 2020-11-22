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
        <select className="location-input-container" name="event-location" ref={locationReference}>
          <option value="Campus Center">Campus Center</option>
          <option value="Oak Hall">Oak Hall</option>
          <option value="Laurel Hall">Laurel Hall</option>
          <option value="Cypress Hall">Cypress Hall</option>
          <option value="Redwood Hall">Redwood Hall</option>
          <option value="Greek Row">Greek Row</option>
          <option value="Wellness and Events Center">Wellness and Events Center</option>
          <option value="Warren Street Gym">Warren Street Gym</option>
          <option value="Honors College">Honors College</option>
          <option value="Gourmet Dining Services">Gourmet Dining Services</option>
          <option value="Library">Library</option>
          <option value="Fenster Hall">Fenster Hall</option>
          <option value="Hiller College of Architecture and Design">Hillier College of Architecture and Design</option>
          <option value="Kupfrian">Kupfrian</option>
          <option value="Campus Center">Campus Center</option>
          <option value="Guttenberg Information Technologies Center">Guttenberg Information Technologies Center</option>
          <option value="Cullimore Hall">Cullimore Hall</option>
          <option value="Central King Building">Central King Building</option>
        </select>
        <input className="time-input-container" placeholder="12:00 PM" type="time" min="00:00" max="23:59" ref={timeReference} />
        <input className="text-area-container" placeholder="Description: Limit to 255 characters" type="text" ref={descriptionReference} />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}
