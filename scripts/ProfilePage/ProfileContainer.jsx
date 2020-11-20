import React from 'react';

import {ProfileInfo} from "./ProfileInfo";
export function ProfileContainer({user, onClose, compId})
{
    // <button onClick={onClose} className="close-btn">&#10006;</button>
    return (
    <div className="profile-container" id={compId} >
        <div className="profile-content-container">
            <img className="profile-picture" src={user.profilePicture} alt="Profile Picture"/>
            <ProfileInfo user={user} />
        </div>
    </div>
    );
}
