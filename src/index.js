import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import {Provider} from "react-redux";

import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from "./pages/game/Game";
import Strategies from "./pages/strategies/Strategies";
import Help from "./pages/help/Help";
import store from "./redux/store";
import Users from "./pages/standing/Users";
import GlobalHistory from "./pages/Spy";

const routing = (
    <Provider store={store}>
        <BrowserRouter history={createBrowserHistory()}>
            <div>
                <GlobalHistory/>
                <Route exact path="/" component={Game}/>
                <Route path="/help" component={Help}/>
                <Route path="/strategy" component={Strategies}/>
                <Route path="/users" component={Users}/>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
