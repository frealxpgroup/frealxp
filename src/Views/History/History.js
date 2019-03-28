
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from 'axios'



export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    GetXP = () => {
        Axios.get(`/user/history`)
        .then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    componentDidMount = () => {
        this.GetXP()
    }

    render() {
        console.log(this.state.data)
       const ChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My XP",
                    backgroundColor: 'rgb(205, 249, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [this.state.data],
                },
                {
                    label: "My Second dataset",
                    fillColor: `rgba(151,187,205,0.5)`,
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    backgroundColor: '#0B33EE',
                    data: [28, 48, 40, 19, 86, 27, 90]
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
            barDatasetSpacing: 1,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"

        }

        return (
            <div >
                history
                    < Bar
                    data={ChartData}
                    options={chartOptions}
                    height={500}
                    width={700}

                />

            </div>
        )
    }
}