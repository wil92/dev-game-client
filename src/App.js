import React from 'react';
import './App.css';
import config from "./config";

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
            this.wsUrl = window.location.origin.replace(/^http/, 'ws');
        }
        this.connectWebSocket();
    }

    connectWebSocket() {
        this.ws = new WebSocket(this.wsUrl);

        this.ws.onopen = () => {
            console.log('connected');
            clearInterval(this.timerId);
            this.fetchField();
        };

        this.ws.onmessage = evt => {
            try {
                this.players = JSON.parse(evt.data);
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
            this.context.fill();
        });
    }

    cleanField() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                this.context.fillStyle = this.field[i][j] ? '#ffffff' : '#000000';
                this.context.fillRect(i * this.rowSize, j * this.rowSize, this.rowSize, this.rowSize);
            }
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
