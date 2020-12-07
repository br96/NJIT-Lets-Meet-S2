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

    function createRandomText()
    {
        let text = "";
        for(let i = 0; i < 5; i++)
        {
            text += Math.floor( Math.random() * 10 );
        }
        return text;
    }

    function createTextField(text)
    {
        let id = "";

        do{
            id = createRandomText();
        } while( document.getElementById(id) !== null )

        return(
        <li key={id}>
            <input type="text" id={"interest-"+id} defaultValue={text} />
            <button onClick={removeTextField} id={id}>Remove</button>
        </li>);
    }

    function updateInterests(data)
    {
        if(data.email !== email) return;
        let interestsList = data.interests;
        setInterests(() => {
            return interestsList.map((entry) => {
                return createTextField(entry);
            });
        });

        let checkbox = document.getElementById("show-interests-check");
        checkbox.checked = data.showInterests;
    }

    function getInterests()
    {
        React.useEffect(() => {
            Socket.emit("send interests", {
                email: email,
            });
            Socket.on("get interests", updateInterests);
            return () => {
                Socket.off("get interests", updateInterests);
            }
        }, []);
    }

    getInterests();

    function submitChanges()
    {
        let msg = [];
        interests.forEach((element) => {
            let textField = document.getElementById("interest-" + element.key);
            if(textField === null) return;
            if(textField.value.length > 0) msg.push(textField.value);
        });
        msg = msg.join(",");
        Socket.emit("update interests", {
            email: email,
            interests: msg,
        });
    }

    function addField()
    {
        let list = [
            ...interests, 
            createTextField("")
        ];
        setInterests(() => list);
    }

    function onShowInterestsClick()
    {
        if(email === undefined || email === null) return;   
        let checkbox = document.getElementById("show-interests-check");
        Socket.emit("show interests changed", {
            email: email,
            showInterests: checkbox.checked,
        });
    }

    return (
    <div>
        <ul>
            {interests}
        </ul>
        <button onClick={addField}>Add</button>
        <button onClick={submitChanges}>Submit</button>
        <div>
            <span>
                Show Interests 
                <input 
                    type="checkbox" 
                    name="show-interests-check" 
                    id="show-interests-check"
                    defaultChecked={false}
                    onClick={onShowInterestsClick}/>
            </span>
        </div>
    </div>
    );
}
