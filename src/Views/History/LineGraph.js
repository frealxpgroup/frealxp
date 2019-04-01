import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import Axios from 'axios'

class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            xp: this.props.xp,
            user_id: this.props.user_id,
            challenge_id: 0,
            challenge_point_value: 0,
            Dates: [],
            Jan: [],
            Feb: [],
            Mar: [],
            Apr: [],
            May: [],
            Jun: [],
            Jul: [],
            Aug: [],
            Sep: [],
            Oct: [],
            Nov: [],
            Dec: []
        }
    }

    getIdFromTracked = () => {
        const { user_id } = this.state
        console.log({user_id})
        Axios.post(`/challenge/tracked/one`, { user_id })
            .then(res => {
                console.log(res)
                this.setState({
                    Dates: res.data
                })
            })
    }
    






    render() {
        console.log(this.state.user_id)
//         var date_test = new Date("2011-07-14 11:23:00".replace(/-/g,"/"));
// console.log(date_test);
        const mappedDates = this.state.Dates.map((date, i) => {
            let myDate = new Date(date.approved_date)
            let stringDate = myDate.toString()

            let newJan = 0;
            let newFeb = 0;
            let newMar = 0;
            if (stringDate.includes('Jan')){
                return newJan =+ 1
            }
            else if (stringDate.includes('Feb')){
                return newFeb =+ 1
            }
            else if (stringDate.includes('Mar')){
                return newMar =+ 1
            }
            this.setState({
                Jan: newJan,
                Feb: newFeb,
                Mar: newMar
            })

           
            // console.log(myDate)
            console.log( typeof stringDate)
            console.log( newJan)
            console.log( newFeb)
            console.log( newMar)
            
            // console.log(dateChanger)
            return (
                <div>
                   <h2>{date.approved_date}</h2> 
                    <h3>{console.log( typeof stringDate)}</h3>
                    <h4>{console.log( newJan)}</h4>
                    <p>{console.log( newFeb)}</p>
                    <p>{console.log( newMar)}</p>


                </div>
                
            )
        })

        const data = {
            labels: [
                "January",
                "February",
                "March",
                // "April",
                // "May",
                // "June",
                // "July"
            ],
            datasets: [
                {
                    label: "My First dataset",
                    data: [
                        90, 20, 30
                    ],
                    fill: false,
                    borderDash: [5, 5]
                }, {
                    hidden: true,
                    label: 'hidden dataset',
                    data: [
                        10, 20, 30
                    ]
                }, {
                    label: "My Second dataset",
                    data: [
                        20, 30, 70
                    ]
                }
            ]
        }

        const options = {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Month'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Value'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                ]
            }
        }


        return (
            <div>
            <button onClick={this.getIdFromTracked}>PUSH ME PLS</button>
            <Line data={data} options={options} />
            <h1>{mappedDates}</h1>
            <h2>{console.log(mappedDates)}</h2>
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
export default connect(mapToProps)(LineGraph)