import * as React from 'react';
import { Socket } from './Socket';

export default function EventForm({oauthName}) {
  const eventTypeReference = React.useRef();
  const locationReference = React.useRef();
  const timeReference = React.useRef();
  const descriptionReference = React.useRef();
  const titleReference = React.useRef();
  const visibilityReference = React.useRef();

  function sendNewEvent(e) {
    Socket.emit('sending new event', {
      owner: oauthName,
      title: titleReference.current.value,
      type: eventTypeReference.current.value,
      location: locationReference.current.value,
      time: timeReference.current.value,
      description: descriptionReference.current.value,
      visibility: visibilityReference.current.value
    });
    e.preventDefault();
  }

  return (
    <div>
      <form className="event-form" onSubmit={sendNewEvent}>
        <h1 className="create-event-header">Create New Event</h1>
        <div className="form-main-content">
          <input className="title-container" placeholder="Name your event . . ." type="text" ref={titleReference} />
          <select id="event-type" className="type-select-container" name="event-type" ref={eventTypeReference}>
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
            <option value="Kupfrian Hall">Kupfrian Hall</option>
            <option value="Campus Center">Campus Center</option>
            <option value="Guttenberg Information Technologies Center">Guttenberg Information Technologies Center</option>
            <option value="Cullimore Hall">Cullimore Hall</option>
            <option value="Central King Building">Central King Building</option>
          </select>
          <input className="time-input-container" placeholder="12:00 PM" type="time" min="00:00" max="23:59" ref={timeReference} />
          <select className="visibility-input-container" name="event-visibility" placeholder="Public" ref={visibilityReference}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="text-and-submit">
          <textarea className="text-area-container" placeholder="Description: Limit to 255 characters" ref={descriptionReference} />
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
