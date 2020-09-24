import React from 'react';
import {Route, Router, Redirect, useRouteMatch} from "react-router-dom";

import StrategyList from "./list/strategy-list";
import StrategyDetails from "./details/strategy-details";
import {isAuth} from "../../utils/user-data";

function Strategies(props) {
    let match = useRouteMatch();
    if (!isAuth()) {
        return (
            <Redirect to={{pathname: "/"}}/>
        );
    }
    return (
        <Router history={props.history}>
            <Route path={`${match.path}/`} exact={true} component={StrategyList}/>
            <Route path={`${match.path}/create`} component={StrategyDetails}/>
            <Route path={`${match.path}/edit/:id`} component={StrategyDetails}/>
        </Router>
    );
}

export default Strategies;
