import * as React from 'react';
import GoogleMapsContainer from './GoogleMapsContainer';

export default function GoogleMapsButtonContainer() {

    const [isOn, setIsOn] = React.useState(false);

    function setOn() {
        if (isOn) {
            setIsOn(false);
        }
        else {
            setIsOn(true);
        }
    }

    return (
        <div>
            <button className="mapping-button" onClick={setOn}>Map</button>
            {isOn ? <GoogleMapsContainer /> : null}
        </div>
    )
}
