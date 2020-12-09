import React from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';

import { User } from '../User';

export default function AttendEventPrompt({ email, id }) {
  if (email === User.current.email) return <div />;

  function sendAttendEvent(event) {
    event.preventDefault();

    Socket.emit('send attend event', {
      owner: email,
      user: User.current.email,
      id,
    });
  }

  return (
    <button className="attend-event-button add-button-field" onClick={sendAttendEvent} type="submit">Attend Event</button>
  );
}

AttendEventPrompt.propTypes = {
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
