import React from 'react';
import {Socket} from '../Socket';

import {ProfileInfo} from "./ProfileInfo";
export function ProfileContainer({user, onClose, compId})
{    
    return (
    <div className="profile-container" id={compId} >
        <div className="profile-content-container">
            <img className="profile-picture" src={user.profilePicture} alt="Profile Picture"/>
            <ProfileInfo user={user} />
        </div>
    </div>
    );
}
