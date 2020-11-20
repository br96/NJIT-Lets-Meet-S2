import * as React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default function Notification() {
        
        const invite = () => {
            toast.success('Check your message inbox', {position: toast.POSITION.RIGHT})
        }
    
        return (
            <div className="Notification">
                <button onClick={invite}>Send Message!</button>
            </div>
        );
}
