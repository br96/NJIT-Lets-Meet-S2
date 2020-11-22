import React, {useState} from "react";
import {Socket} from "./Socket";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useHistory } from "react-router-dom";
import * as buildingData from "./njit-buildings.json"
import GoogleEvent from "./GoogleEvent";

function Map() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

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
    console.log("Received all events in Google Maps");
  }

  function getEventHistory() {
    Socket.on('emit all events', updateEventHistory);
    return () => {
      Socket.off('emit all events', updateEventHistory);
    };
  }

  getEventHistory();

  return <GoogleMap
    defaultZoom={16}
    defaultCenter={{lat: 40.74312, lng: -74.17783 }}
    >
      {buildingData.default.locations.map((location, index) => (
        <Marker
          key={index}
          position={{lat: location.coordinates[0], lng: location.coordinates[1]}}
          onClick={() => {setSelectedBuilding(location)}}/>
      ))}

      {selectedBuilding && (
        <InfoWindow
          position={{lat: selectedBuilding.coordinates[0], lng: selectedBuilding.coordinates[1]}}
          onCloseClick={() => {
            setSelectedBuilding(null);
          }}
        >
          <ul className="test-styles">
            <h1 className="google-location">{selectedBuilding.name}</h1>
            <div className="google-map-event-container">
            {eventLocations.map((location, index) => {
              if (location == selectedBuilding.name) {
                return(
                    <GoogleEvent key={index} title={eventTitles[index]} time={eventTimes[index]} owner={eventOwners[index]}/>
                )
              }
            })}
            </div>
          </ul>
        </InfoWindow>
      )}
    </GoogleMap>
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GoogleMapsContainer() {
  return (
    <div>
      <WrappedMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwtQTi27ArzaBiNMP3AOAr5NKcxGDQNqs&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: "100%" }}/>}
        containerElement={<div style={{height: "800px", width: "800px"}}/>}
        mapElement={<div style={{height: "100%" }}/>}
      />
    </div>
  );
}
