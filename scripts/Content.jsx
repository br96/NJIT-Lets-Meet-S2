import * as React from 'react';
import {Redirect} from 'react-router-dom';
import EventHistory from './EventHistory';
import NavBar from './NavBar';
import './App.css';
import CurrentUsersContainer from './CurrentUsersContainer';
import FilterForm from './Filter';

import {User} from './User';
import {FriendRequestInboxButton} from './FriendRequest/FriendRequestInboxButton';
import EventFormInitButton from './EventFormInitButton';
import GoogleMapsContainer from './GoogleMapsContainer';

export function Content() {
  if(User.current === null) return <Redirect to="/" />

  return (
    <div className="content-container">

      <NavBar />
      <div className="content-view">
        <div className="currentUsers">
          <CurrentUsersContainer />
        </div>
        <div className="event-container-container">
          <div className="button-mapping-container">
            <div className="content-container-buttons">
              <a href="/home">
              <button type="button" className="mapping-button">Events</button>
              </a>

              <a href="/room">
              <button type="button" className="mapping-button">Chat Room</button>
              </a>
            <FriendRequestInboxButton />
          </div>
          <EventFormInitButton />
          </div>
          <div className="event-content-container">
            {/*<GoogleMapsContainer />*/}
            <EventHistory />
          </div>
        </div>
      </div>
      <FilterForm />
    </div>
  );
}