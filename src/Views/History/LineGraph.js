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
            allDates: [],
            allUsers: [],
           
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
    getAllFromTracked = () => {
        
        
        Axios.get(`/challenge/tracked/all`)
            .then(res => {
                console.log(res)
                this.setState({
                    allDates: res.data
                })
            })
    }
    getAllusers = () => {

        Axios.get(`/auth/all`)
        .then(res => {
            this.setState({
                allUsers: res.data
            })
            
        })
    }
    doBoth = () => {
        this.getAllusers()
        this.getAllFromTracked()
    }
    






    render() {
        
        let count = 0;
        let allJan = 0;
        let allFeb = 0;
        let allMar = 0;
        let newJan = 0;
        let newFeb = 0;
        let newMar = 0;
        // console.log(allJan)
        // console.log(allFeb)
        // console.log(allMar)
        // console.log(this.state.allUsers)
        this.state.allUsers.map((allUser, i) => {
            
            count++
        })
        console.log({count})
        this.state.allDates.map((allDate, i) => {
            let allDates = new Date(allDate.approved_date)
            let stringyDate = allDates.toString()
            // console.log(stringyDate)
            

            if (stringyDate.includes('Jan')){
                 allJan++
            }
            else if (stringyDate.includes('Feb')){
                 allFeb++
            }
            else if (stringyDate.includes('Mar')){
                 allMar++
            }

           
            
            return (
                <div>
                   <h2>{allDate.approved_date}</h2> 
                    


                </div>
                
            )
        })
       
         this.state.Dates.map((date, i) => {
            let myDate = new Date(date.approved_date)
            let stringDate = myDate.toString()
            // console.log(stringDate)

            if (stringDate.includes('Jan')){
                 newJan++
            }
            else if (stringDate.includes('Feb')){
                 newFeb++
            }
            else if (stringDate.includes('Mar')){
                 newMar++
            }

           
            
            return (
                <div>
                   <h2>{date.approved_date}</h2> 
                    


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
                    label: "Challenges completed",
                    data: [
                        newJan, newFeb, newMar
                    ],
                    // fill: false,
                    // borderDash: [5, 5]
                }, {
                    hidden: true,
                    label: 'hidden dataset',
                    data: [
                        allJan/count, allFeb/count, allMar/count
                    ]
                }, {
                    hidden: true,
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
                            suggestedMax: 5
                        }
                    }
                ]
            }
        }


        return (
            <div>
            <button onClick={this.getIdFromTracked}>PUSH ME PLS</button>
            <button onClick={this.doBoth}>PUSH All PLS</button>
            <Line data={data} options={options} />
            
            
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