import React from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

import './strategy-details.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import {loadUserData} from "../../../utils/user-data";
import {getApiUrl} from "../../../utils/urls";

const EvalEnum = {
    OK: 0,
    ERROR: 1,
    TIMEOUT: 3,
    INVALID_ACTION: 4
};

class StrategyDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {name: ''};
    }


    componentDidMount() {
        this.setState({id: this.props.match.params.id, name: "", code: ""});
        this.url = getApiUrl();
        if (this.props.match?.params?.id) {
            this.loadStrategy(this.props.match.params.id);
        } else {
            this.loadDummyCode();
        }
    }

    loadStrategy(id) {
        const userData = loadUserData();
        fetch(`${this.url}/strategies/${id}`, {headers: {"Authorization": `Bearer ${userData.token}`}})
            .then(res => res.json())
            .then((code) => {
                if (code) {
                    this.setState({...code});
                }
            })
            .catch(console.log);
    }

    loadDummyCode() {
        const userData = loadUserData();
        fetch(`${this.url}/strategies/dummy`, {headers: {"Authorization": `Bearer ${userData.token}`}})
            .then(res => res.json())
            .then((code) => {
                if (code) {
                    this.setState({...code});
                }
            })
            .catch(console.log);
    }

    onChange(code) {
        this.setState({code});
    }

    validateStrategy() {
        const userData = loadUserData();
        const options = {
            method: "POST",
            headers: {"Authorization": `Bearer ${userData.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({code: this.state.code})
        };
        fetch(`${this.url}/strategies/test`, options)
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    this.setState({
                        valid: data.status,
                        averageTime: data.result?.averageTime,
                        totalTime: data.result?.totalTime
                    });
                }
            })
            .catch(console.log);
    }

    saveStrategy() {
        const options = {
            method: "POST",
            headers: {"Authorization": `Bearer ${loadUserData().token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({code: this.state.code, name: this.state.name})
        };
        if (this.state.id) {
            this.editStrategy(options);
        } else {
            this.createStrategy(options);
        }
    }

    editStrategy(options) {
        fetch(`${this.url}/strategies/${this.state.id}`, options)
            .then(res => res.json())
            .then((strategy) => {
                if (strategy) {
                    this.setState({code: strategy.code, name: strategy.name});
                }
            })
            .catch(console.log);
    }

    createStrategy(options) {
        fetch(`${this.url}/strategies`, options)
            .then(res => res.json())
            .then((strategy) => {
                if (strategy) {
                    this.props.history.replace(`/strategy/edit/${strategy.id}`, this.state);
                }
            })
            .catch(console.log);
    }

    statusTitle(status) {
        switch (status) {
            case EvalEnum.OK:
                return 'VALID';
            case EvalEnum.ERROR:
                return 'ERROR';
            case EvalEnum.INVALID_ACTION:
                return 'INVALID ACTION';
            case EvalEnum.TIMEOUT:
                return 'TIMEOUT';
            default:
                return '';
        }
    }

    toMilliseconds(nanoseconds) {
        if (nanoseconds) {
            return `${Math.round(nanoseconds / 10) / 100} milliseconds`;
        }
        return '';
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentDetails">
                    <div className="DataContainer">
                        <div className="ActionsContainer">
                            <input type="text" placeholder="Strategy Name" value={this.state?.name}
                                   onChange={this.onChangeName.bind(this)}/>
                            <div className="Separator"/>
                            <button onClick={this.saveStrategy.bind(this)}>Save</button>
                            <button onClick={this.validateStrategy.bind(this)}>Validate</button>
                        </div>
                        <AceEditor
                            placeholder="Placeholder Text"
                            mode="javascript"
                            theme="solarized_dark"
                            width="100%"
                            name="blah2"
                            onChange={this.onChange.bind(this)}
                            fontSize={16}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={this.state?.code}
                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>
                        <div>
                            <p>status: {this.statusTitle(this.state?.valid)}</p>
                            <p>average time: {this.toMilliseconds(this.state?.averageTime)}</p>
                            <p>total time: {this.toMilliseconds(this.state?.totalTime)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StrategyDetails;
