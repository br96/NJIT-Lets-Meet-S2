import * as React from 'react';
import {Redirect} from 'react-router-dom';
import EventForm from './EventForm';
import EventHistory from './EventHistory';
import NavBar from './NavBar';
import './App.css';
import CurrentUsersContainer from './CurrentUsersContainer';
import FilterForm from './Filter';

import {User} from './User';
import {FriendRequestInboxButton} from './FriendRequest/FriendRequestInboxButton';
export function Content() {
  if(User.current === null) return <Redirect to="/" />

  return (
    <div className="content-container">
      <NavBar />
      
      <div className="content-container-buttons">
        <a href="/room">
        <button type="button" className="ChatRoom">Chat Room</button>
        </a>
        
        <a href="/map">
        <button type="button" className="ChatRoom">Map</button>
        </a>

        <FriendRequestInboxButton />
      </div>
      
      <FilterForm />
      <div className="content-view">
        <div className="currentUsers">
          <CurrentUsersContainer />
        </div>
        <div className="event-content-container">
          <EventHistory />
          <EventForm />
        </div>
      </div>
    </div>
  );
}