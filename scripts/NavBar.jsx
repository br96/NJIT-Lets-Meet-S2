import React from 'react';
import Settings from "./Settings";

export default function NavBar() {

  const [toggleSettings, setToggleSettings] = React.useState(false);

  function toggleView() {
    if (toggleSettings) {
      setToggleSettings(false);
    }
    else {
      setToggleSettings(true);
    }
  }
  return (
    <div className="njit-header">
      <h4 className="njit-banner">NJIT</h4>
      <h1 className="app-name">Let&apos;s Meet</h1>
      <button onClick={toggleView} className="settings-toggle-button">Settings</button>
      { toggleSettings ? <Settings /> : null}
    </div>
  );
}
