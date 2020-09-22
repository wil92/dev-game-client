import React from 'react';

import './Help.css';
import '../../common.css';
import Toolbar from "../../components/toolbar/Toolbar";

class Help extends React.Component {
    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent">
                    help
                </div>
            </div>
        );
    }
}

export default Help;
