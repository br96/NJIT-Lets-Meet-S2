import React, { useState } from "react";
import { Socket } from './Socket';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    
    function handleChange(event) {
        setQuery(event.target.value);
    }
    
    function SearchQuery(event) {
        event.preventDefault();
        console.log("search query");
        console.log(query);
        
        Socket.emit("search query", {
           query
        });
        
        setQuery('');
    }
    
    return (
        <div>
            <form className="search-bar" onSubmit={SearchQuery} autoComplete="off">
                <input type="text" onChange={handleChange} value={query} placeholder="Search Events"/>
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
}