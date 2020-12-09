import React, { useState } from 'react';
import {
  GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow,
} from 'react-google-maps';
import { Socket } from './Socket';
import * as buildingData from './njit-buildings.json';
import GoogleEvent from './GoogleEvent';

function Map() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [eventOwners, setEventOwners] = React.useState([]);
  const [eventTitles, setEventTitles] = React.useState([]);
  const [eventLocations, setEventLocations] = React.useState([]);
  const [eventTimes, setEventTimes] = React.useState([]);

  function updateEventHistory(data) {
    setEventOwners(data.all_event_owners);
    setEventTitles(data.all_event_titles);
    setEventLocations(data.all_event_locations);
    setEventTimes(data.all_event_times);
  }

  function getEventHistory() {
    Socket.on('emit all events', updateEventHistory);
    return () => {
      Socket.off('emit all events', updateEventHistory);
    };
  }

  getEventHistory();

  function command() {
    Socket.emit('request all events');
  }

  return (
    <div className="temp-container">
      <button type="button" className="refresh-button" onClick={command}>Refresh</button>
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: 40.74312, lng: -74.17783 }}
      >
        {buildingData.default.locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.coordinates[0], lng: location.coordinates[1] }}
            onClick={() => { setSelectedBuilding(location); }}
          />
        ))}

        {selectedBuilding && (
        <InfoWindow
          position={{ lat: selectedBuilding.coordinates[0], lng: selectedBuilding.coordinates[1] }}
          onCloseClick={() => {
            setSelectedBuilding(null);
          }}
          onClick={getEventHistory}
        >
          <ul className="test-styles">
            <h1 className="google-location">{selectedBuilding.name}</h1>
            <div className="google-map-event-container">
              {eventLocations.map((location, index) => {
                if (location === selectedBuilding.name) {
                  return (
                    <GoogleEvent
                      key={index}
                      title={eventTitles[index]}
                      time={eventTimes[index]}
                      owner={eventOwners[index]}
                    />
                  );
                }
                return null;
              })}
            </div>
          </ul>
        </InfoWindow>
        )}
      </GoogleMap>
    </div>

  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GoogleMapsContainer() {
  return (
    <div className="googling-container">
      <WrappedMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6VFjv9tnM1hUILNRgwD3yznEhWmiGUb4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '500px', width: '500px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
