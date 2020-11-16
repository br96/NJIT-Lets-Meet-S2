import * as React from 'react';
import { Socket } from './Socket';
import EventSession from './EventSession';
import Login from "./Login";

export default function EventHistory() {
  const [eventOwners, setEventOwners] = React.useState([]);
  const [eventTitles, setEventTitles] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [eventLocations, setEventLocations] = React.useState([]);
  const [eventTimes, setEventTimes] = React.useState([]);
  const [eventDescriptions, setEventDescriptions] = React.useState([]);

  function updateEventHistory(data) {
    setEventOwners(data.all_event_owners);
    setEventTitles(data.all_event_titles);
    setEventTypes(data.all_event_types);
    setEventLocations(data.all_event_locations);
    setEventTimes(data.all_event_times);
    setEventDescriptions(data.all_event_descriptions);
  }

  function getEventHistory() {
    Socket.on('emit all events', updateEventHistory);
    return () => {
      Socket.off('emit all events', updateEventHistory);
    };
  }

  getEventHistory();

  return (
    <div className="event-history-container">
      <div className="hidden">
        <Login />
      </div>
      { eventTypes.map((eventType, index) => (
        <EventSession
          key={index}
          owner={eventOwners[index]}
          title={eventTitles[index]}
          type={eventType}
          location={eventLocations[index]}
          time={eventTimes[index]}
          description={eventDescriptions[index]}
        />
      ))}
    </div>
  );
}
