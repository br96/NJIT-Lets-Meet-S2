import * as React from 'react';

export default function GoogleEvent({title, time, owner}) {
    return (
        <div className="google-map-event">
            <h6 className="google-title"> {title} </h6>
            <h6 className="google-time"> {time} </h6>
            <h6 className="google-owner"> {owner} </h6>
        </div>
    )
}
