import React from 'react';
import ReactJson from "react-json-view";
import {connect} from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

import './strategy-details.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";

import {
    createStrategy, editStrategy,
    fetchStrategy,
    loadDummyCode,
    setCode,
    validateStrategy
} from "../../../redux/strategies/actions";

const EvalEnum = {
    OK: 0,
    ERROR: 1,
    TIMEOUT: 3,
    INVALID_ACTION: 4
};

class StrategyDetails extends React.Component {

    componentDidMount() {
        if (this.props.match?.params?.id) {
            this.setState({id: this.props.match.params.id});
            this.props.fetchStrategy(this.props.match.params.id);
        } else {
            this.props.loadDummyCode();
        }
    }

    onChange(code) {
        this.props.setCode({code: code});
    }

    onChangeName(event) {
        this.props.setCode({name: event.target.value});
    }

    saveStrategy() {
        if (this.state.id) {
            this.props.editStrategy(this.state.id);
        } else {
            this.props.createStrategy(this.props.history);
        }
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

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent PageContentDetails">
                    <div className="DataContainer">
                        <div className="ActionsContainer">
                            <input type="text" placeholder="Strategy Name" value={this.props?.name}
                                   onChange={this.onChangeName.bind(this)}/>
                            <div className="Separator"/>
                            <button onClick={this.saveStrategy.bind(this)}>Save</button>
                            <button onClick={this.props.validateStrategy}>Validate</button>
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
                            value={this.props?.code}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>
                        <div className="StatusContainer">
                            {this.props?.result?.status !== undefined &&
                            <p>status: {this.statusTitle(this.props?.result?.status)}</p>}
                            {this.props?.result?.result &&
                            <ReactJson src={this.props.result.result} theme="solarized"/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    code: state?.strategies?.code?.code,
    name: state?.strategies?.code?.name,
    result: state?.strategies?.result
});

export default connect(mapStateToProps, {
    loadDummyCode,
    setCode,
    validateStrategy,
    createStrategy,
    fetchStrategy,
    editStrategy
})(StrategyDetails);
