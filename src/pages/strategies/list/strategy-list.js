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
                <div className="PageContent PageContentTop">
                    <div className="ActionContainer">
                        {this.enableNewStrategyButton() && <button onClick={this.newStrategy.bind(this)}>
                            {this.props?.i18n?.strategiesList?.newStrategyButton}
                        </button>}
                    </div>
                    <div className="TableContainer">
                        <table className="Table">
                            <thead>
                            <tr>
                                <th>{this.props?.i18n?.strategiesList?.name}</th>
                                <th>{this.props?.i18n?.strategiesList?.validation}</th>
                                <th>{this.props?.i18n?.strategiesList?.status}</th>
                                <th>{this.props?.i18n?.strategiesList?.actions}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.props?.strategies || []).map((strategy, index) => (
                                <tr key={index}>
                                    <td>{strategy.name}</td>
                                    <td>{strategy.valid ? this.props?.i18n?.strategiesList?.validStatus : this.props?.i18n?.strategiesList?.invalidStatus}</td>
                                    <td>{strategy.active ? this.props?.i18n?.strategiesList?.activeStatus : ""}</td>
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
            </div>
        );
    }
}

const mapStateToProps = state => ({strategies: state?.strategies?.list, i18n: state?.i18n?.i18n});

export default connect(mapStateToProps, {fetchStrategies, activateStrategy})(StrategyList);
