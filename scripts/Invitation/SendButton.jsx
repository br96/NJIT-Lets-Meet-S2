import * as React from 'react';
import { User } from '../User';
import { Socket } from '../Socket';

function SendMessageButton() {
  function handleSubmit(event) {
    const newMessage = document.getElementById('message_input');
    
    Socket.emit('new message input', {
      'message': newMessage.value,
      /*email: User.current.email, */
    });
    console.log(`Sent the message ${newMessage.value} to server!`);
    newMessage.value = '';

    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="submitButton">
      <input id="message_input" placeholder="Enter a message" className="input" autoComplete="off" />
      <button className="send" type="submit">Send</button>
    </form>
  );
}

export default SendMessageButton;