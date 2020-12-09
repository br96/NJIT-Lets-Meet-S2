import React from 'react';
import { Socket } from './Socket';

export function UpdateInterestsUI({ email }) {
  const [interests, setInterests] = React.useState([]);

  function removeTextField(event) {
    const { id } = event.target;
    setInterests((fields) => fields.filter((value) => value.key !== id));
  }

  function createRandomText() {
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += Math.floor(Math.random() * 10);
    }
    return text;
  }

  function createTextField(text) {
    let id = '';

    do {
      id = createRandomText();
    } while (document.getElementById(id) !== null);

    return (
      <li key={id}>
        <input type="text" id={`interest-${id}`} defaultValue={text} />
        <button type="button" className="add-button-field" onClick={removeTextField} id={id}>Remove</button>
      </li>
    );
  }

  function updateInterests(data) {
    if (data.email !== email) return;
    const interestsList = data.interests;
    setInterests(() => interestsList.map((entry) => createTextField(entry)));

    const checkbox = document.getElementById('show-interests-check');
    checkbox.checked = data.showInterests;
  }

  function getInterests() {
    React.useEffect(() => {
      Socket.emit('send interests', {
        email,
      });
      Socket.on('get interests', updateInterests);
      return () => {
        Socket.off('get interests', updateInterests);
      };
    }, []);
  }

  getInterests();

  function submitChanges() {
    let msg = [];
    interests.forEach((element) => {
      const textField = document.getElementById(`interest-${element.key}`);
      if (textField === null) return;
      if (textField.value.length > 0) msg.push(textField.value);
    });
    msg = msg.join(',');
    Socket.emit('update interests', {
      email,
      interests: msg,
    });
  }

  function addField() {
    const list = [
      ...interests,
      createTextField(''),
    ];
    setInterests(() => list);
  }

  function onShowInterestsClick() {
    if (email === undefined || email === null) return;
    const checkbox = document.getElementById('show-interests-check');
    Socket.emit('show interests changed', {
      email,
      showInterests: checkbox.checked,
    });
  }

  return (
    <div>
      <ul>
        {interests}
      </ul>
      <button type="button" className="add-button-field" onClick={addField}>Add</button>
      <button type="button" className="add-button-field" onClick={submitChanges}>Submit</button>
      <div>
        <span className="showing-interest">
          Show Interests
          <input
            type="checkbox"
            name="show-interests-check"
            id="show-interests-check"
            defaultChecked={false}
            onClick={onShowInterestsClick}
          />
        </span>
      </div>
    </div>
  );
}
