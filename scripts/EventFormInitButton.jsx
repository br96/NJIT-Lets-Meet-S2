import * as React from 'react';
import EventForm from "./EventForm";

export default function EventFormInitButton() {

    const [clicked, setClicked] = React.useState(false);

    function isClicked() {
        if (clicked) {
            setClicked(false);
        }
        else {
            setClicked(true);
        }
    }
    return (
        <div className='event-form-init'>
            <div type="button" className="test" onClick={isClicked}><img className="add-button" src="./static/img/add-button.png" alt=""/></div>
            {clicked ? <EventForm /> : null}
        </div>
    )
}
