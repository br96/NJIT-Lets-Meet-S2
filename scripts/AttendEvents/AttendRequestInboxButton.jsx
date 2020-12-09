import React from 'react';

import AttendRequestInbox from './AttendRequestInbox';

export default function AttendRequestInboxButton() {
  const [showInbox, setShowInbox] = React.useState(false);

  function toggleInbox() {
    setShowInbox((show) => !show);
  }

  return (
    <div>
      <button className="ChatRoom attend-request-inbox-button mapping-button" onClick={toggleInbox} type="submit">Received Attend Requests</button>
      { showInbox && <AttendRequestInbox /> }
    </div>
  );
}
