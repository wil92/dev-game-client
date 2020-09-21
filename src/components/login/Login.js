import React from "react";

import {config} from "../../config";
import './Login.css'

class Login extends React.Component {
    login(){
        const url = 'https://github.com/login/oauth/authorize';
        const scope = 'read:user read:email read:follow';
        window.location.href = `${url}?client_id=${config.githubClientId}&scope=${scope}`
    }

    render() {
        return (
            <div className="LoginContainer">
                <button className="LoginButton" onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default Login;
