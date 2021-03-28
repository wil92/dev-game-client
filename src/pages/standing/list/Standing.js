import React from 'react';
import {connect} from "react-redux";

import '../../../common.css';
import './Standing.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import {fetchUsers} from "../../../redux/users/actions";

class Standing extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    openUserDetails(username) {
        this.props.history.push(`/users/${username}`);
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentTop">
                    <div className="TableContent">
                        <table className="Table">
                            <thead>
                            <tr>
                                <th>{this.props?.i18n?.standingTable?.position}</th>
                                <th>{this.props?.i18n?.standingTable?.username}</th>
                                <th>{this.props?.i18n?.standingTable?.totalGames}</th>
                                <th>{this.props?.i18n?.standingTable?.winGames}</th>
                                <th>{this.props?.i18n?.standingTable?.ratio}</th>
                                <th>{this.props?.i18n?.standingTable?.points}</th>
                                <th>{this.props?.i18n?.standingTable?.actions}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.props?.users || []).map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.total}</td>
                                    <td>{user.wins}</td>
                                    <td>{user.total > 0 ? Math.round(user.wins / user.total * 100) / 100 : 0}</td>
                                    <td>{Math.round(user.points)}</td>
                                    <td>
                                        <button onClick={() => this.openUserDetails(user.username)}>{this.props?.i18n?.standingTable?.detailsButton}</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({users: state?.users?.list, i18n: state?.i18n?.i18n});

export default connect(mapStateToProps, {fetchUsers})(Standing);
