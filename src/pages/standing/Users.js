import React from 'react';
import {Route, Router, useRouteMatch} from "react-router-dom";

import Standing from "./list/Standing";
import Details from "./user/Details";


function Strategies(props) {
    let match = useRouteMatch();
    return (
        <Router history={props.history}>
            <Route path={`${match.path}/`} exact={true} component={Standing}/>
            <Route path={`${match.path}/:id`} component={Details}/>
        </Router>
    );
}

export default Strategies;
