import React from 'react';
import './App.css';
import config from "./config";

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

class App extends React.Component {
    rowSize = 8;

    players = [];
    field = [];

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
            this.timerId = setInterval(() => {
                this.ws.close();
                this.connectWebSocket();
                console.log('connecting');
            }, 3000);
        };
    }

    fetchField() {
        fetch(`${this.url}/game/field`)
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    this.setState({
                        height: data.length * this.rowSize,
                        width: data[0].length * this.rowSize
                    });
                    this.field = data;
                }
            })
            .catch(console.log)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.context = this.refs.canvas.getContext('2d');
        this.cleanField();
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
            <div className="App">
                <header className="App-header">
                    <canvas ref="canvas"
                            height={this.state?.height}
                            width={this.state?.width}/>
                </header>
            </div>
        );
    }
}

export default App;
