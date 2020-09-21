import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from "history";

import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from "./pages/game/Game";
import Strategies from "./pages/strategies/Strategies";

const routing = (
    <Router history={createBrowserHistory()}>
        <Route path="/" exact={true} component={Game}/>
        <Route path="/strategy" component={Strategies}/>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
