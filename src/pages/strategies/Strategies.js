import React from 'react';
import {Route, Router, useRouteMatch} from "react-router-dom";

import StrategyList from "./list/strategy-list";
import StrategyDetails from "./details/strategy-details";

function Strategies(props) {
    let match = useRouteMatch();
    return (
        <Router history={props.history}>
            <Route path={`${match.path}/`} exact={true} component={StrategyList}/>
            <Route path={`${match.path}/create`} component={StrategyDetails}/>
            <Route path={`${match.path}/edit/:id`} component={StrategyDetails}/>
        </Router>
    );
}

export default Strategies;
