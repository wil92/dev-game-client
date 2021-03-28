import React from 'react';

import './Game.css';
import '../../common.css';
import Field from "./field/Field";
import Toolbar from "../../components/toolbar/Toolbar";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.fieldContainer = React.createRef();
        this.field = React.createRef();
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        const currentSize = Math.min(this.fieldContainer.current.offsetWidth, this.fieldContainer.current.offsetHeight, 720);
        this.field.current.setState({
            height: currentSize,
            width: currentSize
        });
    }

    render() {
        return (
            <div className="Page">
                <Toolbar history={this.props?.history}/>
                <div ref={this.fieldContainer} className="PageContent">
                    <div className="FieldSize">
                        <Field ref={this.field}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
