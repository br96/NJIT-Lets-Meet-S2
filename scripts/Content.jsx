import * as React from 'react';
import {Redirect} from 'react-router-dom';
import EventForm from './EventForm';
import EventHistory from './EventHistory';
import { User } from './User';
import { ProfileOverlay } from './ProfilePage/ProfileOverlay';
import NavBar from './NavBar';
import './App.css';
import Landing from "./Landing"
import CurrentUsersContainer from './CurrentUsersContainer';
import FilterForm from './Filter';
import Notification from './Notification';

export function Content() {
  if(User.current === null) return <Redirect to="/" />

  return (
    <div className="content-container">
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
