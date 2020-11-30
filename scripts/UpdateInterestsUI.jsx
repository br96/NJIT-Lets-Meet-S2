import React from 'react';
import { Socket } from './Socket';

export function UpdateInterestsUI({email})
{
    const [interests, setInterests] = React.useState([]);

    function updateInterests(data)
    {
        let interestsList = data.interests;
        setInterests(() => {
            return interestsList.map((entry, i) => {
                return <li key={i}>{entry}</li>
            });
        });
    }

    function getInterests()
    {
        React.useEffect(() => {
            Socket.emit("send interests", {
                email: email,
            });
            Socket.on("get interests", updateInterests);
            console.log("send the send");
            return () => {
                Socket.off("get interests", updateInterests);
            }
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
