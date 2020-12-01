import React from 'react';
import { Socket } from './Socket';
import { User } from './User';

export function UpdateInterestsUI({email})
{
    const [interests, setInterests] = React.useState([]);

    function removeTextField(event)
    {
        let id = event.target.id;
        setInterests((fields) => fields.filter((value) => {
            return value.key !== id;
        }));
    }

    function createTextField(text, i)
    {
        let id = "interest-"+i;
        return(
        <li key={id}>
            <input type="text" defaultValue={text} />
            <button onClick={removeTextField} id={id}>Remove</button>
        </li>);
    }

    function updateInterests(data)
    {
        if(data.email !== email) return;
        let interestsList = data.interests;
        setInterests(() => {
            return interestsList.map((entry, i) => {
                return createTextField(entry, i);
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

    function submitChanges()
    {
        let count = interests.length;
        let msg = [];
        for(let i = 0; i < count; i++)
        {
            let textField = document.getElementById("interest-"+i);
            if(textField.value.length > 0) msg.push(textField.value);
        }
        msg = msg.join(",");
        console.log(msg);
        Socket.emit("update interests", {
            email: email,
            interests: msg,
        });
    }

    function addField()
    {
        let count = interests.length;
        let list = [
            ...interests, 
            createTextField("", count)
        ];
        setInterests(() => list);
    }

    return (
    <div>
        <ul>
            {interests}
        </ul>
        <button onClick={addField}>Add</button>
        <button onClick={submitChanges}>Submit</button>
    </div>
    );
}
