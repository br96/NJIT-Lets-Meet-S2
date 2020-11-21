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
      <GoogleMapsContainer />
      <NavBar />
      <FilterForm />
      <div className="currentUsers">
        <CurrentUsersContainer />
        <Notification />
      </div>
      <div className="event-content-container">
        <EventHistory />
        <EventForm />
      </div>
    </div>
  );
}