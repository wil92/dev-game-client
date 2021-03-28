import React from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.chart = new Chart(this.chartRef.current, {
            type: 'line',
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }
                }]
            },
            data: {
                labels: [],
                datasets: [{
                    label: this.props.title || 'title',
                    data: (this.props.data || []),
                    fill: 'none',
                    backgroundColor: this.props.color || "#fff",
                    pointRadius: 2,
                    borderColor: this.props.color || '#000',
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data) {
            this.chart.data.labels = this.props.data.map(d => d.label);
            this.chart.data.datasets[0].data = this.props.data;
            this.chart.update();
        }
    }

    render() {
        return (
            <canvas className="Canvas"
                    ref={this.chartRef}
                    width={600}
                    height={300}/>
        );
    }
}

export default LineChart;
