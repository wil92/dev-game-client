import React from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";

import './strategy-details.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";
import config from "../../../config";
import {loadUserData} from "../../../utils/user-data";

class StrategyDetails extends React.Component {

    componentDidMount() {
        this.url = config.apiUrl;
        if (!this.url) {
            this.url = window.location.origin;
        }
        this.loadDummyCode();
        this.setState({valid: "INVALID"});
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
        this.setState({valid: "INVALID"})
    }

    validateStrategy() {
    }

    saveStrategy() {
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentDetails">
                    <div className="DataContainer">
                        <div className="ActionsContainer">
                            <button onClick={this.saveStrategy.bind(this)}>Save</button>
                            <button onClick={this.validateStrategy.bind(this)}>Validate ({this.state?.valid})</button>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default StrategyDetails;
