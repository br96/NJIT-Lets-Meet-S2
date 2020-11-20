import React, { useState } from "react";
import { Socket } from './Socket';
import MultiSelect from "react-multi-select-component";

export default function FilterForm() {
    const options = [
        { label: "Study", value: "Study" },
        { label: "Hangout", value: "Hangout"}
    ];
    
    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState('');
    
    function handleChange(event) {
        setQuery(event.target.value);
    }
    
    function FilterEvents(e) {
        e.preventDefault();
        console.log("filter events");
        console.log(selected);
        Socket.emit("filter events", {
            filters : selected,
            query
        });
        
        setQuery('');
    }
    
    return (
        <div>
            <form className="filter-form" onSubmit={FilterEvents}>
                <input type="text" onChange={handleChange} value={query} placeholder="Search Events"/>
                <MultiSelect options={options} value={selected} onChange={setSelected} hasSelectAll={ false } />
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}