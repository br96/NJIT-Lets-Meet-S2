import React, { useState } from "react";
import { Socket } from './Socket';
import MultiSelect from "react-multi-select-component";

export default function FilterForm({positioning}) {
    const options = [
        { label: "Study", value: "Study" },
        { label: "Hangout", value: "Hangout"},
    ];

    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState('');
    
    const ownerRef = React.useRef();

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
        <div className="event-filters-styling" id={positioning}>
            <form className="filter-form" onSubmit={FilterEvents}>
                {/*<select className="select-owners" name="event-owner" ref={ownerRef}>
                    <option value="All Events">All Events</option>
                    <option value="My Events">My Events</option>
                    <option value="Friends Events">Friends Events</option>
                </select>*/}
                <input type="text" onChange={handleChange} value={query} placeholder="Search Events"/>
                <MultiSelect options={options} value={selected} onChange={setSelected} hasSelectAll={ false } />
                <button className="submit-filter-button" type="submit">Submit</button>
            </form>
        </div>
    );
}