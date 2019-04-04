import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import Axios from 'axios'
import './LineGraph.scss'


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
        console.log({ user_id })
        Axios.post(`/challenge/tracked/one`, { user_id })
            .then(res => {
                
                this.setState({
                    Dates: res.data
                })
            })
    }
    getAllFromTracked = () => {


        Axios.get(`/challenge/tracked/all`)
            .then(res => {
                
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
        this.getIdFromTracked()
    }
    componentDidMount = () => {
        this.doBoth()
        console.log('its working?')
    }







    render() {

        let count = 0;
        let allJan = 0;
        let allFeb = 0;
        let allMar = 0;
        let allApr = 0;
        let allMay = 0;
        let allJun = 0;
        let allJul = 0;
        let allAug = 0;
        let allSep = 0;
        let allOct = 0;
        let allNov = 0;
        let allDec = 0;
        let newJan = 0;
        let newFeb = 0;
        let newMar = 0;
        let newApr = 0;
        let newMay = 0;
        let newJun = 0;
        let newJul = 0;
        let newAug = 0;
        let newSep = 0;
        let newOct = 0;
        let newNov = 0;
        let newDec = 0;
        
        this.state.allUsers.map((allUser, i) => {

            count++
        })
        
        this.state.allDates.map((allDate, i) => {
            let allDates = new Date(allDate.approved_date)
            let stringyDate = allDates.toString()
            


            if (stringyDate.includes('Jan')) {
                allJan++
            }
            else if (stringyDate.includes('Feb')) {
                allFeb++
            }
            else if (stringyDate.includes('Mar')) {
                allMar++
            }
            else if (stringyDate.includes('Apr')) {
                allApr++
            }
            else if (stringyDate.includes('May')) {
                allMay++
            }
            else if (stringyDate.includes('Jun')) {
                allJun++
            }
            else if (stringyDate.includes('Jul')) {
                allJul++
            }
            else if (stringyDate.includes('Aug')) {
                allAug++
            }
            else if (stringyDate.includes('Sep')) {
                allSep++
            }
            else if (stringyDate.includes('Oct')) {
                allOct++
            }
            else if (stringyDate.includes('Nov')) {
                allNov++
            }
            else if (stringyDate.includes('Dec')) {
                allDec++
            }
            else console.log('Month unknown', stringyDate)



            return (
                <div>
                    <h2>{allDate.approved_date}</h2>



                </div>

            )
        })
        

        this.state.Dates.map((date, i) => {
            let myDate = new Date (date.approved_date)
             
            
            let stringDate = myDate.toString()
            


            if (stringDate.includes('Jan')) {
                newJan++
            }
            else if (stringDate.includes('Feb')) {
                newFeb++
            }
            else if (stringDate.includes('Mar')) {
                newMar++
            }
            else if (stringDate.includes('Apr')) {
                newApr++
            }
            else if (stringDate.includes('May')) {
                newMay++
            }
            else if (stringDate.includes('Jun')) {
                newJun++
            }
            else if (stringDate.includes('Jul')) {
                newJul++
            }
            else if (stringDate.includes('Aug')) {
                newAug++
            }
            else if (stringDate.includes('Sep')) {
                newSep++
            }
            else if (stringDate.includes('Oct')) {
                newOct++
            }
            else if (stringDate.includes('Nov')) {
                newNov++
            }
            else if (stringDate.includes('Dec')) {
                newDec = 0
            }
            else console.log('nothing happened', stringDate)





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
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            datasets: [
                {
                    label: "Challenges completed",
                    data: [
                        newJan, newFeb, newMar, newApr, newMay, newJun, newJul, newAug, newSep, newOct, newNov, newDec
                    ],
                    borderColor: '#4280A4',
                    fill: false,
                    // borderDash: [5, 5]
                }, {

                    hidden: true,
                    label: 'Average Challenges completed this month',
                    data: [
                        allJan / count, allFeb / count, allMar / count, allApr / count, allMay / count, allJun / count, allJul / count, allAug / count, allSep / count, allOct / count, allNov / count, allDec / count
                    ],
                    fill: false,
                    borderColor: 'rgb(183, 47, 47)'
                }
            ]
        }

        const options = {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: true,
                text: 'Challenges Completed',

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
                            labelString: ''
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: ''
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
                <div className='xtrastuff'>
                    {/* <button className='graphbutton' onClick={this.doBoth}>See your completed this month!</button> */}
                </div>
                <article className='linegraph'><Line data={data} options={options} /></article>


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