import * as React from 'react';
import FilterForm from './Filter';
import OwnProfile from './OwnProfile';
import { Socket } from './Socket';

export default function Settings() {
    const [toggleInfo, setToggleInfo] = React.useState(false);

    function toggleInfoSettings() {
        if (toggleInfo) {
            setToggleInfo(false);
        }
        else {
            setToggleInfo(true);
            Socket.emit("get current info", Socket.id);
            console.log("sent");
        }
    }



    return (
        <div className="settings-container">
            <ul className="settings-list">
                <li onClick={toggleInfoSettings} className="setting-option">Edit Profile</li>
                {/* <li onClick={toggleFilterSettings} className="setting-option">Set Filters</li> */}
            </ul>
            {toggleInfo ? <OwnProfile /> : null}
        </div>
    )
}
