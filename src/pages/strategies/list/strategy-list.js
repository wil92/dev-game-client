import React from 'react';

import './strategy-list.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import {loadUserData} from "../../../utils/user-data";
import {getApiUrl} from "../../../utils/urls";

class StrategyList extends React.Component {
    componentDidMount() {
        this.url = getApiUrl();
        this.fetchStrategies();
    }

    activateStrategy(id) {
        fetch(`${this.url}/strategies/${id}/activate`, {
            method: 'POST',
            headers: {"Authorization": `Bearer ${loadUserData().token}`}
        })
            .then(() => {
                this.fetchStrategies();
            })
            .catch(console.log);
    }

    fetchStrategies() {
        fetch(`${this.url}/strategies`, {headers: {"Authorization": `Bearer ${loadUserData().token}`}})
            .then(res => res.json())
            .then((strategies) => {
                if (strategies) {
                    this.setState({strategies});
                }
            })
            .catch(console.log);
    }

    editStrategy(id) {
        this.props.history.push(`/strategy/edit/${id}`);
    }

    newStrategy() {
        this.props.history.push('/strategy/create');
    }

    enableNewStrategyButton() {
        return this.state?.strategies.length < 5;
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentLocal">
                    <div className="ActionContainer">
                        {this.enableNewStrategyButton() && <button onClick={this.newStrategy.bind(this)}>
                            new strategy
                        </button>}
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
                        {(this.state?.strategies || []).map((strategy, index) => (
                            <tr key={index}>
                                <td>{strategy.name}</td>
                                <td>{strategy.valid ? "VALID" : "INVALID"}</td>
                                <td>{strategy.active ? "ACTIVE" : ""}</td>
                                <td>
                                    <button onClick={() => this.editStrategy(strategy._id)}>edit</button>
                                    <button onClick={() => this.activateStrategy(strategy._id)}>activate</button>
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
