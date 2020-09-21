import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import StrategyList from "./list/strategy-list";
import StrategyDetails from "./details/strategy-details";

function Strategies() {
    let match = useRouteMatch();
    console.log(match.path);

    return (
        <Switch>
            <Route path={`${match.path}/`} exact={true} component={StrategyList}/>
            <Route path={`${match.path}/create`} component={StrategyDetails}/>
            <Route path={`${match.path}/edit/:id`} component={StrategyDetails}/>
        </Switch>
    );
}

export default Strategies;
