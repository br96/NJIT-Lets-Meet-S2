import * as React from 'react';
import Notification from './Notification';
import './App.css';

export function Room() {
    
    return(
        <div className="content-room">
            <p className="Roompage">Welcome to the Private Page</p>
            <Notification />
        </div>
        );
}