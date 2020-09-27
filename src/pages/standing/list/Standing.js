import React from 'react';
import {connect} from "react-redux";

import '../../../common.css';
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
                    <table className="Table">
                        <thead>
                        <tr>
                            <th>Position</th>
                            <th>Username</th>
                            <th>Points</th>
                            {/*<th>Actions</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {(this.props?.users || []).map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{Math.round(user.points)}</td>
                                {/*<td>*/}
                                {/*    <button onClick={() => this.openUserDetails(user.username)}>details</button>*/}
                                {/*</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({users: state?.users?.list});

export default connect(mapStateToProps, {fetchUsers})(Standing);
