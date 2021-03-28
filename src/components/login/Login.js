import React from "react";

import {config} from "../../config";
import './Login.css'
import {connect} from "react-redux";
import {logInAction, logOutAction} from "../../redux/auth/actions"
import {getApiUrl} from "../../utils/urls";

class Login extends React.Component {

    componentDidMount() {
        this.url = getApiUrl()
        this.setState({dialogClass: "DialogClose"});
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
                .then(data => this.props.logInAction(data))
        }
    }

    removeQuery() {
        const location = {...this.props.history.location, search: ''};
        this.props.history.push(location);
    }

    buttonLoginLogout() {
        if (!this.props.isAuth) {
            this.setState({dialogClass: "DialogOpen"});
        } else {
            this.logout();
        }
    }

    logout() {
        this.props.logOutAction();
        this.props.history.replace('/');
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
                        onClick={this.buttonLoginLogout.bind(this)}>{this.props.isAuth ? this.props?.i18n['bannerLogOutButton'] : this.props?.i18n['bannerLogInButton']}</button>
                <div className={this.state?.dialogClass}
                     onClick={this.closeDialog.bind(this)}>
                    <div className="Dialog"
                         onClick={this.stopPropagation.bind(this)}>
                        <div className="DialogHead">{this.props?.i18n['loginModalTitle']}</div>
                        <div className="DialogBody">
                            <button className="ButtonGithub"
                                    onClick={this.login.bind(this)}>Github</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({isAuth: Boolean(state?.auth?.token), i18n: state?.i18n?.i18n});

export default connect(mapStateToProps, {logInAction, logOutAction})(Login);
