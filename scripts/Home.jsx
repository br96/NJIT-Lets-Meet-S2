import * as React from 'react';
import Login from './Login';
import { Content } from './Content';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {GoogleMapsContainer} from './GoogleMapsContainer';

export function Home() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Content} />
                    {/* <Route path="/map" component={GoogleMapsContainer} /> */}
                </Switch>
            </div>
        </Router>
    );
}