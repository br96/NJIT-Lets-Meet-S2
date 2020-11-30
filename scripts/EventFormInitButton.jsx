import * as React from 'react';
import EventForm from "./EventForm";
import { Socket } from './Socket';

export default function EventFormInitButton() {

    const [clicked, setClicked] = React.useState(false);

    const [oauthName, setOauthName] = React.useState("");

    function isClicked() {
        if (clicked) {
            setClicked(false);
        }
        else {
            setClicked(true);
        }
    }

    React.useEffect(() => {
        Socket.on(Socket.id, (data) => {
            setOauthName(data.name);
        });
    });

    return (
        <div className='event-form-init'>
            <div type="button" className="test" onClick={isClicked}><img className="add-button" src="./static/img/add-button.png" alt=""/></div>
            {clicked ? <EventForm oauthName={oauthName}/> : null}
        </div>
    )
}
