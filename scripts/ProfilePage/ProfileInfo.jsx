import React from 'react';
import {Socket} from '../Socket';

import {User, UserFlags} from '../User';
export function ProfileInfo({user})
{
    const [showInterests, setShowInterests] = React.useState((user.flags & UserFlags.ShowInterests) === UserFlags.ShowInterests);
    console.log("show interests " + showInterests);
    let interestsList = "Hidden";

    if(showInterests)
    {
        interestsList = user.interests;
        if(interestsList.length <= 0) interestsList = "No interests";
    }

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
        </p>
        <p>{interestsList}</p>
        <p>Bio</p>
        <div className="profile-bio">{user.bio}</div>
    </div>
    );
}
