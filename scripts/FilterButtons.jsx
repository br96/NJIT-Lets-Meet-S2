import * as React from 'react';
import EventForm from './EventForm';
import EventHistory from './EventHistory';

export default function FilterButtons() {

    const allReference = React.useRef();
    const studyReference = React.useRef();
    const hangoutReference = React.useRef();
    const [filterStatus, setFilterStatus] = React.useState("all");

    function handleSubmit(e) {
        console.log(e.target.value);
        setFilterStatus(e.target.value);
    }

    return (
        <div>
            <form onChange={handleSubmit}>
                <label htmlFor="all-events">All</label>
                <input name="filter-query" type="radio" id="all-events" ref={allReference} value="all" />
                <label htmlFor="study">Study</label>
                <input name="filter-query" type="radio" id="study" ref={studyReference} value="study" />
                <label htmlFor="hangout">Hangout</label>
                <input name="filter-query" type="radio" id="hangout" ref={hangoutReference} value="hangout" />
            </form>
            <div className="event-content-container">
                <EventHistory filter={filterStatus}/>
                <EventForm />
            </div>
        </div>
    )
}
