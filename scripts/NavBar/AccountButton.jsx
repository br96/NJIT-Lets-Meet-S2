import React from 'react';

import {ProfileContainer} from '../ProfilePage/ProfileContainer';
import {User} from "../User";
export function AccountButton()
{
    const [showProfile, setShowProfile] = React.useState(false);

    function onProfileClick()
    {
        setShowProfile((show) => !show);
    }

    return (
    <div className="account-button-container">
        <i className="fas fa-user-circle user-profile-button clickable-icon" onClick={onProfileClick}></i>
        { showProfile && <ProfileContainer onClose={onProfileClick} user={User.current} compId="navbar-profile-container" /> }
    </div>
    );
}
