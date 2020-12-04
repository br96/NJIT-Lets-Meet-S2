import * as React from 'react';
import { Socket } from './Socket';
import EventSession from './EventSession';
import Login from "./Login";

export default function EventHistory() {
  const [eventIds, setEventIds] = React.useState([])
  const [eventOwners, setEventOwners] = React.useState([]);
  const [eventTitles, setEventTitles] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [eventLocations, setEventLocations] = React.useState([]);
  const [eventTimes, setEventTimes] = React.useState([]);
  const [eventDescriptions, setEventDescriptions] = React.useState([]);

  function updateEventHistory(data) {
    setEventIds(data.all_event_ids);
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
          key={eventOwners.length - index - 1}
          id={eventIds[eventOwners.length - index - 1]}
          owner={eventOwners[eventOwners.length - index - 1]}
          title={eventTitles[eventOwners.length - index - 1]}
          type={eventType}
          location={eventLocations[eventOwners.length - index - 1]}
          time={eventTimes[eventOwners.length - index - 1]}
          description={eventDescriptions[eventOwners.length - index - 1]}
        />
      ))}
    </div>
  );
}
