import * as React from 'react';
import Login from './Login';
import { Content } from './Content';
import { Room } from './Room';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export function Home() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Content} />
                    <Route path="/room" component={Room} />
                </Switch>
            </div>
        </Router>
    );
}