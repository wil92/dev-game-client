import React from 'react';
import ReactMarkdown from "react-markdown";

import './Help.css';
import '../../common.css';
import Toolbar from "../../components/toolbar/Toolbar";
import {getApiUrl} from "../../utils/urls";

class Help extends React.Component {

    componentDidMount() {
        this.url = getApiUrl();

        this.fetchHelpText();
    }

    fetchHelpText() {
        fetch(`/help-en.md`)
            .then(help => help.text())
            .then((help) => {
                if (help) {
                    this.setState({help})
                }
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="Page HelpPage">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent HelpPageContent">
                    <ReactMarkdown source={this.state?.help || ''}/>
                </div>
            </div>
        );
    }
}

export default Help;
