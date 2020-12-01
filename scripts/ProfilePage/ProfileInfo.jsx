import React from 'react';
import {Socket} from '../Socket';

import {User, UserFlags} from '../User';

function getDefaultInterestsList(showInterests, interests)
{
    if(!showInterests) return "Hidden";
    if(interests.length > 0) return interests;
    return "No interests";
}

export function ProfileInfo({user})
{
    const [showInterests, setShowInterests] = React.useState((user.flags & UserFlags.ShowInterests) === UserFlags.ShowInterests);
    const [interestsList, setInterestsList] = React.useState(getDefaultInterestsList(showInterests, user.interests));

    function onShowInterestsClick(event)
    {
        const checkbox = document.getElementById("show-interests");
        Socket.emit('show interests changed', {
            email: user.email,
            showInterests: checkbox.checked,
        });
    }

    function showInterestsToggled()
    {
        React.useEffect(() => {
            Socket.on("on show interests changed", (data) => {
                if(data.email !== user.email) return;
                setShowInterests(() => data.showInterests);
            });
        }, []);
    }
    showInterestsToggled();

    React.useEffect(() => {
        Socket.on("get interests", (data) => {
            if(data.email !== user.email) return;
            user.interests = data.interests.join(",");
            setInterestsList(user.interests);
        });
    }, []);

    return (
    <div className="profile-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p><br/></p>
        <p>
            Interests:
            { user === User.current && 
                <input 
                    type="checkbox" 
                    name="show-interests" 
                    id="show-interests" 
                    defaultChecked={showInterests}
                    onClick={onShowInterestsClick} /> 
            }
            <br/>
        </p>
        <p>{interestsList}</p>
        <p>Bio</p>
        <div className="profile-bio">{user.bio}</div>
    </div>
    );
}
