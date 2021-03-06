import * as React from 'react';
import Login from './Login';
import { Content } from './Content';
import { Room } from './Room';
import GoogleMapsContainer from "./GoogleMapsContainer";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from "./About";

export function Routing() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Content} />
                    <Route path="/room" component={Room} />
                    <Route path="/map" component={GoogleMapsContainer} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
}