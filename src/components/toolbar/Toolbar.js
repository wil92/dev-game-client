import React from 'react';
import {Link} from "react-router-dom";

import './Toolbar.css';
import Login from "../login/Login";
import {isAuth} from "../../utils/user-data";

class Toolbar extends React.Component {
    render() {
        return (
            <div className="Toolbar">
                <div>
                    <Link className="Button" to="/">
                        <div className="ButtonContainer"><span className="ButtonText">{"Game"}</span></div>
                    </Link>
                </div>
                <div className="Separator"/>
                {isAuth() && <div>
                    <Link className="Button" to="/strategy">
                        <div className="ButtonContainer"><span className="ButtonText">{"{Codes}"}</span></div>
                    </Link>
                </div>}
                <div>
                    <Link className="Button" to="/help">
                        <div className="ButtonContainer"><span className="ButtonText">{"¿Help?"}</span></div>
                    </Link>
                </div>
                <div className="Login"><Login history={this.props?.history}/></div>
            </div>
        );
    }
}

export default Toolbar;
