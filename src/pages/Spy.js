import React from 'react';
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga'
import config from "../config";

class Spy extends React.Component {
    constructor(props) {
        super(props);
        ReactGA.initialize(config.googleAnalytics);
        this.props.history.listen(location => ReactGA.pageview(location.pathname));
    }

    render() {
        return null;
    }
}

const GlobalHistory = withRouter(Spy);

export default GlobalHistory;
