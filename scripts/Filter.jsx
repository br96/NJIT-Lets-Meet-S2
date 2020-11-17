import React, { useState } from "react";
import { Socket } from './Socket';
import MultiSelect from "react-multi-select-component";

export default function FilterForm() {
    const options = [
        { label: "Study", value: "Study" },
        { label: "Hangout", value: "Hangout"}
    ];
    
    const [selected, setSelected] = useState([]);
    
    function FilterEvents(e) {
        console.log("filter events");
        console.log(selected);
        Socket.emit("filter events", {
            filters : selected
        });
        
        e.preventDefault();
    }
    
    return (
        <div>
            <form className="filter-form" onSubmit={FilterEvents}>
                <MultiSelect options={options} value={selected} onChange={setSelected} hasSelectAll={ false } />
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}