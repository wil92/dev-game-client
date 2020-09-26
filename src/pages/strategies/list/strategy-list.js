import React from 'react';
import {connect} from "react-redux";

import './strategy-list.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import {activateStrategy, fetchStrategies} from "../../../redux/strategies/actions";

class StrategyList extends React.Component {
    componentDidMount() {
        this.props.fetchStrategies();
    }

    editStrategy(id) {
        this.props.history.push(`/strategy/edit/${id}`);
    }

    newStrategy() {
        this.props.history.push('/strategy/create');
    }

    enableNewStrategyButton() {
        return this.props?.strategies?.length < 5;
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
                        {(this.props?.strategies || []).map((strategy, index) => (
                            <tr key={index}>
                                <td>{strategy.name}</td>
                                <td>{strategy.valid ? "VALID" : "INVALID"}</td>
                                <td>{strategy.active ? "ACTIVE" : ""}</td>
                                <td>
                                    <button onClick={() => this.editStrategy(strategy._id)}>edit</button>
                                    <button onClick={() => this.props.activateStrategy(strategy._id)}>activate</button>
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

const mapStateToProps = state => ({strategies: state?.strategies?.list});

export default connect(mapStateToProps, {fetchStrategies, activateStrategy})(StrategyList);
