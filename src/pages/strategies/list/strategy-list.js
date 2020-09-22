import React from 'react';

import './strategy-list.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import config from "../../../config";
import {loadUserData} from "../../../utils/user-data";

class StrategyList extends React.Component {
    componentDidMount() {
        this.url = config.apiUrl;
        if (!this.url) {
            this.url = window.location.origin;
        }
        this.fetchStrategies();
    }

    fetchStrategies() {
        const userData = loadUserData();
        fetch(`${this.url}/strategies`, {headers: {"Authorization": `Bearer ${userData.token}`}})
            .then(res => res.json())
            .then((strategies) => {
                if (strategies) {
                    this.setState({strategies});
                }
            })
            .catch(console.log);
    }

    editStrategy(id) {
        console.log('edit', id);
    }

    removeStrategy(id) {
        console.log('remove', id);
    }

    newStrategy() {
        this.props.history.push('/strategy/create');
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentLocal">
                    <div className="ActionContainer">
                        <button onClick={this.newStrategy.bind(this)}>new strategy</button>
                    </div>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Validation</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(this.state?.strategies || []).map(strategy => (
                            <tr>
                                <td>strategy.name</td>
                                <td>{strategy.valid ? "VALID" : "INVALID"}</td>
                                <td>{strategy.active ? "ACTIVE" : ""}</td>
                                <td>
                                    <button onClick={() => this.editStrategy(strategy._id)}>edit</button>
                                    <button onClick={() => this.removeStrategy(strategy._id)}>remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StrategyList;
