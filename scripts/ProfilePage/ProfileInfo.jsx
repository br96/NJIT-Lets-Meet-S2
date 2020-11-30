import React from 'react';

import {UserFlags} from '../User';
export function ProfileInfo({user})
{
    const showInterests = user.flags & UserFlags.ShowInterests;

    return (
    <div className="profile-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p><br/></p>
        <p>Interests:</p>
        <p>{showInterests? user.interests : <p>Hidden</p>}</p>
        <p>Bio</p>
        <div className="profile-bio">{user.bio}</div>
    </div>
    );
}
