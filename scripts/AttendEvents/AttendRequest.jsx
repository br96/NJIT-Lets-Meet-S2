import React from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';
import { User } from '../User';

export default function AttendRequest({
  attendee, fromEmail, title, id,
}) {
  function replyAttendRequest(accept) {
    Socket.emit('reply attend request', {
      from: fromEmail,
      to: User.current.email,
      accept,
      id,
    });
  }

  function acceptAttendRequest(event) {
    replyAttendRequest(true);
    event.preventDefault();
  }

  function declineAttendRequest(event) {
    replyAttendRequest(false);
    event.preventDefault();
  }

  return (
    <div className="attend-request">
      <span>
        {attendee}
        {' '}
        wants to attend your event:
        {' '}
        {title}
      </span>
      <div className="attend-request-options">
        <button onClick={acceptAttendRequest} type="submit">Accept</button>
        <button onClick={declineAttendRequest} type="submit">Decline</button>
      </div>
    </div>
  );
}

AttendRequest.propTypes = {
  attendee: PropTypes.string.isRequired,
  fromEmail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
