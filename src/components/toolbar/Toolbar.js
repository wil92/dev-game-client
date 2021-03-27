import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './Toolbar.css';
import Login from "../login/Login";
import {changeLanguage} from "../../redux/i18n/actions";
import {allowLanguage} from "../../redux/i18n/reducer";

class Toolbar extends React.Component {
    languageChange(event) {
        this.props.changeLanguage(event.target.value);
    }

    render() {
        return (
            <div className="Toolbar">
                <div>
                    <Link className="Button" to="/">
                        <div className="ButtonContainer"><span className="ButtonText">{this.props?.i18n['bannerGameButton']}</span></div>
                    </Link>
                </div>
                <div className="Separator"/>
                <div className="LanguageContainer">
                    <select value={this.props?.language} onChange={this.languageChange.bind(this)}>
                        {allowLanguage.map((lang) => (
                            <option value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <Link className="Button" to="/users">
                        <div className="ButtonContainer"><span className="ButtonText">{this.props?.i18n['bannerUsersButton']}</span></div>
                    </Link>
                </div>
                {this.props.isAuth && <div>
                    <Link className="Button" to="/strategy">
                        <div className="ButtonContainer"><span className="ButtonText">{this.props?.i18n['bannerCodesButton']}</span></div>
                    </Link>
                </div>}
                <div>
                    <Link className="Button" to="/help">
                        <div className="ButtonContainer"><span className="ButtonText">{this.props?.i18n['bannerHelpButton']}</span></div>
                    </Link>
                </div>
                <div className="Login"><Login history={this.props?.history}/></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: Boolean(state?.auth?.token),
    i18n: state?.i18n?.i18n,
    language: state?.i18n?.language
});

export default connect(mapStateToProps, {changeLanguage})(Toolbar);
