import React from 'react';
import { Socket } from './Socket';

export function UpdateInterestsUI({email})
{
    const [interests, setInterests] = React.useState([]);

    function updateInterests(data)
    {
        console.log(data);
    }

    function getInterests()
    {
        React.useEffect(() => {
            Socket.emit("send interests", {
                email: email,
            });
            Socket.on("get interests", updateInterests);
            console.log("send the send");
        }, []);
    }

    getInterests();

    return (
    <div>
        <ul>
            {interests}
        </ul>
    </div>
    );
}
