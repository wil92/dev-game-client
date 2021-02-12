import React from 'react';
import {connect} from "react-redux";

import moment from 'moment';

import '../../../common.css';
import './Details.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import {fetchUser} from "../../../redux/users/actions";
import LineChart from "./chart/Chart";

class Details extends React.Component {
    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.fetchUser(username);
    }

    formatNumber(num) {
        if (typeof num === "number") {
            return Math.round(num * 100) / 100;
        }
        return 0;
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent">
                    <div className="UserDetailsContainer">
                        <div className="DetailsStyle">
                            <span>Username: {this.props?.user?.username || ''}</span>
                            <span>Wins Games: {this.props?.user?.wins || ''}</span>
                            <span>Total Games: {this.props?.user?.total || ''}</span>
                            <span>Points: {this.formatNumber(this.props?.user?.points)}</span>
                        </div>
                        <div className="GraphStyle">
                            <LineChart data={this.props.points} title="Points"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    points: (state.users.points || [])
        .map(point => ({y: point.value, x: new Date(point.createdAt), label: moment(point.createdAt).format('lll')}))
        .filter((v, i) => i > state.users.points.length - 30)
});

export default connect(mapStateToProps, {fetchUser})(Details);
