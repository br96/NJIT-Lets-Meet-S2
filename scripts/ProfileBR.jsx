import * as React from 'react';
import {AttendEventPrompt} from "./AttendEvents/AttendEventPrompt";

export default function ProfileBR({name, email, picture, interests, bio, id}) {
    return (
        <div className="profile-shown">
            <img className="pfp-for-users" src={picture} alt="profile-picture"/>
            <h1 className="event-typing-family">{name}</h1>
            <h3 className="event-typing-family">{email}</h3>
            <h3 className="event-typing-family">{interests}</h3>
            <h3 className="event-typing-family">{bio}</h3>
            <AttendEventPrompt email={email} id={id}/>
        </div>
    )
}
