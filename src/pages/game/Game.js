import React from 'react';

import './Game.css';
import Field from "./field/Field";
import Toolbar from "../../components/toolbar/Toolbar";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.fieldContainer = React.createRef();
        this.field = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    resize() {
        const currentSize = Math.min(this.fieldContainer.current.offsetWidth, this.fieldContainer.current.offsetHeight, 720);
        this.field.current.setState({
            height: currentSize,
            width: currentSize
        })
    }

    render() {
        return (
            <div className="Page">
                <Toolbar/>
                <div ref={this.fieldContainer} className="FieldContainer">
                    <div className="FieldSize">
                        <Field ref={this.field}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
