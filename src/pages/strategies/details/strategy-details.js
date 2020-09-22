import React from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";

import './strategy-details.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import config from "../../../config";
import {loadUserData} from "../../../utils/user-data";

const EvalEnum = {
    OK: 0,
    ERROR: 1,
    TIMEOUT: 3,
    INVALID_ACTION: 4
};

class StrategyDetails extends React.Component {

    componentDidMount() {
        this.url = config.apiUrl;
        if (!this.url) {
            this.url = window.location.origin;
        }
        this.loadDummyCode();
    }

    loadDummyCode() {
        const userData = loadUserData();
        fetch(`${this.url}/strategies/dummy`, {headers: {"Authorization": `Bearer ${userData.token}`}})
            .then(res => res.json())
            .then((code) => {
                if (code) {
                    this.setState({code: code.code});
                }
            })
            .catch(console.log);
    }

    onLoad() {
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
    }

    statusTitle(status) {
        switch (status){
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

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentDetails">
                    <div className="DataContainer">
                        <div className="ActionsContainer">
                            <input type="text" placeholder="Strategy Name"/>
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
                            onLoad={this.onLoad.bind(this)}
                            onChange={this.onChange.bind(this)}
                            fontSize={16}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={this.state?.code}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: false,
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
