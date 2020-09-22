import React from 'react';

import './strategy-list.css';
import '../../../common.css';
import Toolbar from "../../../components/toolbar/Toolbar";

class StrategyList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div className="PageContent">
                    strategy list
                </div>
            </div>
        );
    }
}

export default StrategyList;
