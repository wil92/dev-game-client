import React from 'react';
import {Route, Router, Redirect, useRouteMatch} from "react-router-dom";
import {connect} from "react-redux";

import StrategyList from "./list/strategy-list";
import StrategyDetails from "./details/strategy-details";

function Strategies(props) {
    let match = useRouteMatch();
    if (!props.isAuth) {
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

const mapStateToProps = state => ({isAuth: Boolean(state?.auth?.token)});

export default connect(mapStateToProps)(Strategies);
