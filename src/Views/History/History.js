import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import { LineChart } from 'react-chartjs-2';
// var LineChart = require("react-chartjs").Line;

class History extends Component {

    render() {
        return (
            <div> History
                {/* <LineChart data={chartData} options={chartOptions} />
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{ maintainAspectRatio: false }}
                /> */}
            </div> 
        )
    }
};
export default History