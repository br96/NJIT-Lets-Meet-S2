import * as React from 'react';
import EventForm from './EventForm';
import EventHistory from './EventHistory';
import NavBar from './NavBar';
import './App.css';
import CurrentUsersContainer from './CurrentUsersContainer';
import FilterForm from './Filter';
import Notification from './Notification';
import GoogleMapsContainer from "./GoogleMapsContainer";

export function Content() {

  return (
    <div className="content-container">
      <NavBar />
      
      <a href="/room">
      <button type="button" className="ChatRoom" onClick="/room">Chat Room</button>
      </a>
      
      <a href="/map">
      <button type="button" className="ChatRoom" onClick="/map">Map</button>
      </a>
      
      <FilterForm />
      <div className="currentUsers">
        <CurrentUsersContainer />
      </div>
      <div className="event-content-container">
        <EventHistory />
        <EventForm />
      </div>
    </div>
  );
}