import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga'

import config from "../config";
import {fetchI18n} from "../redux/i18n/actions";

class Spy extends React.Component {
    constructor(props) {
        super(props);
        ReactGA.initialize(config.googleAnalytics);
        this.props.history.listen(location => ReactGA.pageview(location.pathname));
        this.props.fetchI18n();
    }

    render() {
        return null;
    }
}

const GlobalHistory = withRouter(Spy);

export default  connect(() => ({}), {fetchI18n})(GlobalHistory);
