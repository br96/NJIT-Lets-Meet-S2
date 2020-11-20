import React from 'react';
import Settings from "./Settings";

import {ProfileOverlay} from "./ProfilePage/ProfileOverlay"
import {ProfileContainer} from "./ProfilePage/ProfileContainer"
import {User} from "./User";
export default function NavBar() {

  const [toggleSettings, setToggleSettings] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  function toggleView() {
    if (toggleSettings) {
      setToggleSettings(false);
    }
    else {
      setToggleSettings(true);
    }
  }

  function onProfileClick()
  {
    setShowProfile((show) => !show);
  }

  return (
    <div className="njit-header">
      <h4 className="njit-banner">NJIT</h4>
      <h1 className="app-name">Let&apos;s Meet</h1>
      <i className="fas fa-user-circle user-profile-button" onClick={onProfileClick}></i>
      { showProfile && <ProfileContainer onClose={onProfileClick} user={User.current} compId="navbar-profile-container" /> }
      <i className="fas fa-cog settings-toggle-button" onClick={toggleView}></i>
      { toggleSettings ? <Settings /> : null}
    </div>
  );
}
