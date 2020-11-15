import * as React from 'react';

export default function CurrentUser({name, connectionStatus}) {
    return (
        <div>
            <div className="current-user-display">
                <div className="current-user-name">{name}</div>
                <div id={connectionStatus}></div>
            </div>
        </div>
    )
}
