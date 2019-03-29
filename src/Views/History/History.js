
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Axios from 'axios';
import LineGraph from './LineGraph';



class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user_id: this.props.user_id,
            xp: this.props.xp,
            avgXp: 0
        }
    }

    getAllXP = () => {
        Axios.get(`/user/history`)
            .then(res => {
                console.log(res)
                const averageXP = (list) => {
                    let sum = 0,
                        count = 0,
                        i;

                    for (i = 0; i < list.length; i++) {

                        sum += list[i].xp;
                        ++count;

                    }
                    return sum / count
                }
                const averagedXP = averageXP(res.data)
                this.setState({
                    avgXp: averagedXP
                })
            })
    }
    componentDidMount = () => {
        this.getAllXP()
    }


    render() {

        console.log(this.state.user_id)
        const ChartData = {
            labels: [],
            datasets: [
                {
                    label: "My XP",
                    backgroundColor: 'rgb(205, 249, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [this.state.xp],
                },
                {
                    label: "World Average",
                    fillColor: `rgba(151,187,205,0.5)`,
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    backgroundColor: '#0B33EE',
                    data: [this.state.avgXp]
                }
            ]
        }
        const chartOptions = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - If there is a stroke on each bar
            barShowStroke: true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth: 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing: 5,

            //Number - Spacing between data sets within X values
            barDatasetSpacing: 5,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: this.avgXp
                    }
                }]
            }
        }

        return (
            <div >
                history
                    < Bar
                    data={ChartData}
                    options={chartOptions}
                    height={100}
                    width={350}

                />
                <LineGraph />

            </div>
        )
    }
}

const mapToProps = (reduxState) => {
    const { user_id, xp } = reduxState

    return {
        user_id,
        xp
    }
}

export default connect(mapToProps)(History)
