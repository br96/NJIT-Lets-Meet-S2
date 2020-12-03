import * as React from 'react';
import {AttendEventPrompt} from "./AttendEvents/AttendEventPrompt";

export default function ProfileBR({name, email, picture, bio, id}) {

    return (
        <div className="profile-shown">
            <img src={picture} alt="profile-picture"/>
            <h1>{name}</h1>
            <h3>{email}</h3>
            <h3>{bio}</h3>
            <AttendEventPrompt email={email} id={id}/>
        </div>
    )
}
