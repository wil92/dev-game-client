import React from 'react';
import {connect} from "react-redux";
import ReactMarkdown from "react-markdown";

import './Help.css';
import '../../common.css';
import Toolbar from "../../components/toolbar/Toolbar";
import {getApiUrl} from "../../utils/urls";

class Help extends React.Component {

    componentDidMount() {
        this.url = getApiUrl();
        this.lang = null;
    }

    componentDidUpdate(prevProps) {
        // console.log('AAA', this.props?.i18n, pre);
        if (this.props?.language !== this.lang) {
            // console.log('aaa', this.props?.language)
            this.lang = this.props?.language;
            this.fetchHelpText();
        }
    }

    fetchHelpText() {
        if (this.lang) {
            fetch(`/help/${this.lang}.md`)
                .then(help => help.text())
                .then((help) => {
                    if (help) {
                        this.setState({help})
                    }
                })
                .catch(console.log);
        }
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

const mapStateToProps = state => ({language: state?.i18n?.language});

export default connect(mapStateToProps)(Help);
