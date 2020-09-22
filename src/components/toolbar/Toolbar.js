import React from 'react';

import './Toolbar.css';
import Login from "../login/Login";

class Toolbar extends React.Component {
    render() {
        return (
            <div className="Toolbar">
                <div className="Separator"/>
                <div className="Login"><Login history={this.props?.history}/></div>
            </div>
        );
    }
}

export default Toolbar;
