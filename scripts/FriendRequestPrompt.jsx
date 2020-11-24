import React from 'react';

export function FriendRequestPrompt()
{
    const FRIEND_REQUEST_PROMPT_ID = "friend-request-prompt";
    const [isHidden, setIsHidden] = React.useState(true);

    function sendFriendRequest()
    {
        
    }

    function showPrompt(event)
    {
        let pos = [event.pageX, event.pageY];
        let div = document.getElementById(FRIEND_REQUEST_PROMPT_ID);
        div.style.left = pos[0];
        div.style.top = pos[1];
        setIsHidden(false);
    }
    
    React.useEffect(() => {
        document.removeEventListener('click', showPrompt);
        document.addEventListener('click', showPrompt);
        setIsHidden(true);
    }, []);

    return (
    <div id={FRIEND_REQUEST_PROMPT_ID} hidden={isHidden}>
        Send Friend Request
    </div>
    );
}
