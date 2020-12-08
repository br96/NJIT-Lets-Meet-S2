import * as React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default function Notification() {
        
        const invite = () => {
            
            toast.success('Special Chat Room, Any questions about the homeworks and the others', {position: toast.POSITION.RIGHT});
            toast.error('please refrain from using inappropriate comments', {position: toast.POSITION.CENTER});
            toast.info("Welcome to the ChatRoom", {position: toast.POSITION.Left});
        };
    
        return (
            <div className="Notify">
                <button onClick={invite} className="Notification">Leave Any Message bottom input!</button>
            </div>
        );
}
