import React, {useState} from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useHistory } from "react-router-dom";
import * as buildingData from "./njit-buildings.json"

function Map() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

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
            <li>EVENT 1</li>
            <li>Event 2</li>
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
