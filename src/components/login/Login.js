import React from "react";

import {config} from "../../config";
import './Login.css'
import {clearSession, isAuth, saveUserData} from "../../utils/user-data";


const LOGIN_TITLE = 'Login';
const LOGOUT_TITLE = 'Logout';

class Login extends React.Component {

    componentDidMount() {
        this.url = config.apiUrl;
        if (!this.url) {
            this.url = window.location.origin;
        }
        this.setState({dialogClass: "DialogClose"});
        this.updateAuthStatus();
        this.loginInApi();

        this.removeQuery();
    }

    loginInApi() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const code = params.get('code');
        if (code) {
            this.removeQuery();
            fetch(`${this.url}/auth/github`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({code})
                })
                .then(res => res.json())
                .then(data => {
                    saveUserData(data.username, data.token);
                    this.updateAuthStatus();
                })
        }
    }

    removeQuery() {
        const location = {...this.props.history.location, search: ''};
        this.props.history.push(location);
    }

    buttonLoginLogout() {
        if (!this.state.isAuth) {
            this.setState({dialogClass: "DialogOpen"});
        } else {
            this.logout();
        }
    }

    logout() {
        clearSession();
        this.updateAuthStatus();
    }

    updateAuthStatus() {
        this.setState({
            buttonTitle: isAuth() ? LOGOUT_TITLE : LOGIN_TITLE,
            isAuth: isAuth()
        });
    }

    closeDialog() {
        this.setState({dialogClass: "DialogClose"});
    }

    login() {
        const url = 'https://github.com/login/oauth/authorize';
        const scope = 'read:user read:email read:follow';
        window.location.href = `${url}?client_id=${config.githubClientId}&scope=${scope}`
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="LoginContainer">
                <button className="LoginButton"
                        onClick={this.buttonLoginLogout.bind(this)}>{this.state?.buttonTitle}</button>
                <div className={this.state?.dialogClass} onClick={this.closeDialog.bind(this)}>
                    <div className="Dialog" onClick={this.stopPropagation.bind(this)}>
                        <div className="DialogHead">Login in dev-game</div>
                        <div className="DialogBody">
                            <button className="ButtonGithub" onClick={this.login.bind(this)}>Github</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
