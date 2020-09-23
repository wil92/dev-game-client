import React from 'react';

import config from "../../../config";

const FieldEnum = {
    FREE: 0,
    BLOCK: 1,
    GAS: 2
};

const MessagesTypes = {
    USERS_DATA: 'USERS_DATA',
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
        this.url = config.apiUrl;
        this.wsUrl = config.wsUrl;
        if (!this.url) {
            this.url = window.location.origin;
        }
        if (!this.wsUrl) {
            const protocol = window.location.protocol;
            const wsProtocol = protocol === "http:" ? "ws:" : "wss:";
            this.wsUrl = window.location.origin.replace(new RegExp(`^${protocol}`, "g"), wsProtocol);
        }
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
            <canvas ref={this.canvas}
                    height={this.state?.height}
                    width={this.state?.width}/>
        );
    }
}

export default Field;
