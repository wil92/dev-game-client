import React from 'react';

import './Field.css';
import {getApiUrl, getWebsocketUrl} from "../../../utils/urls";

const FieldEnum = {
    FREE: 0,
    BLOCK: 1,
    GAS: 2
};

const MessagesTypes = {
    USERS_DATA: 'USERS_DATA',
    GAME_STANDING: 'GAME_STANDING',
    MAP_UPDATE: 'MAP_UPDATE',
    GAME_PAUSE: 'GAME_PAUSE',
    GAME_END: 'GAME_END',
    GAME_START: 'GAME_START'
};

class Field extends React.Component {
    rowSize = 8;

    players = [];
    field = [];

    constructor(props) {
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.url = getApiUrl();
        this.wsUrl = getWebsocketUrl();
        this.connectWebSocket();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.context = this.canvas.current.getContext('2d');
        this.cleanField();
    }

    componentWillUnmount() {
        this.close = true;
        this.ws.close();
    }

    connectWebSocket() {
        this.ws = new WebSocket(this.wsUrl + "/websocket");

        this.ws.onopen = () => {
            console.log('connected');
            clearInterval(this.timerId);
            this.fetchField();
        };

        this.ws.onmessage = evt => {
            try {
                const message = JSON.parse(evt.data);
                if (this.field && this.state && this.field.length !== 0) {
                    this.rowSize = this.state.height / this.field.length;
                }
                switch (message.type) {
                    case MessagesTypes.USERS_DATA:
                        this.players = message.data;
                        this.paintPlayers();
                        break;
                    case MessagesTypes.MAP_UPDATE:
                        this.field = message.data;
                        break;
                    case MessagesTypes.GAME_START:
                        this.fetchField();
                        break;
                    case MessagesTypes.GAME_STANDING:
                        this.updateStanding(message.data);
                        break
                    default:
                }
                this.paintPlayers();
            } catch (er) {
                console.log(er);
            }
        };

        this.ws.onerror = () => this.ws.close();

        this.ws.onclose = () => {
            if (!this.close) {
                this.timerId = setInterval(() => {
                    this.ws.close();
                    this.connectWebSocket();
                    console.log('connecting');
                }, 3000);
            }
        };
    }

    updateStanding(standing) {
        this.setState({standing})
    }

    fetchField() {
        fetch(`${this.url}/game/field`)
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    this.field = data;
                }
            })
            .catch(console.log)
    }

    paintPlayers() {
        this.cleanField();
        this.players.forEach(player => {
            this.context.fillStyle = player.color;
            const xpos = player.position.x * this.rowSize, ypos = player.position.y * this.rowSize;
            const radius = this.rowSize / 2;
            this.context.beginPath();
            this.context.arc(xpos + radius, ypos + radius, radius, 0, 2 * Math.PI);
            this.context.strokeStyle = '#ffffff';
            this.context.stroke();
            this.context.fill();

            if (this.state?.selected === player.id) {
                const markRadius = this.rowSize * 1.5;
                this.context.beginPath();
                this.context.arc(xpos + radius, ypos + radius, markRadius, 0, 2 * Math.PI);
                this.context.strokeStyle = '#ff0000';
                this.context.stroke();
            }
        });
    }

    cleanField() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                this.context.fillStyle = this.getSquareColor(this.field[i][j]);
                this.context.fillRect(i * this.rowSize, j * this.rowSize, this.rowSize, this.rowSize);
            }
        }
    }

    getSquareColor(rowValue) {
        switch (rowValue) {
            case FieldEnum.GAS:
                return '#7fd28d';
            case FieldEnum.BLOCK:
                return '#ffffff';
            case FieldEnum.FREE:
                return '#000000';
            default:
                return '#ffffff';
        }
    }

    render() {
        return (
            <div className="FieldContainer">
                <canvas ref={this.canvas}
                        height={this.state?.height}
                        width={this.state?.width}/>
                <table className="StandingTable">
                    <thead>
                    <tr>
                        <th className="TableSeparator">user</th>
                        <th className="TableSeparator">strategy</th>
                        <th className="TableSeparator">health</th>
                        <th className="TableSeparator">standing</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state?.standing?.map((strategy, index) => (
                        <tr key={index}
                            onClick={() => this.setState({selected: this.state.selected === strategy.id ? '' : strategy.id})}>
                            <td className="TableSeparator">{strategy?.username}</td>
                            <td className="TableSeparator">{strategy?.name}</td>
                            <td className="TableSeparator">{strategy?.health}</td>
                            <td className="TableSeparator">{strategy?.standing || 'ALIVE'}</td>
                            <td><input type="radio" checked={strategy.id === this.state.selected} readOnly/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Field;
