import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavThing from './components/navbar';
import Login from './components/login';

ReactDOM.render(
    <div style={{backgroundColor: "#333333"}}>
        <NavThing />
        <HashRouter basename="/">
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
            </Switch>
        </HashRouter>
    </div>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
