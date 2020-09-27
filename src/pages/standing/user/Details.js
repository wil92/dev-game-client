import React from 'react';
import {connect} from "react-redux";

import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";

class Details extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Details);
