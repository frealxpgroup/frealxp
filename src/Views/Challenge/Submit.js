import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import '../../Views/Challenge/Submit.scss'

import "react-datepicker/dist/react-datepicker.css";



class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userChallenges: [],
            selectedChallenge: "",
            description: ""
        };
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
    }

    //methods

    //handles date selection
    handleCalendarChange(date) {
        this.setState({
            startDate: date
        });
    }

    //this button will get all the challenges that the user has accepted. The data from the database is put on state.
    getChallengesButton = () => {
        console.log('button hit')
        axios.get(`/challenges/user`)
        .then(res => { })

    }

    render() {
        return (
            <div className="submit-main">
                <h1>FRealXP</h1>
                <div>
                    <div className="select-challenge" >
                        <button onClick={this.getChallengesButton} >select your challenge from your challenge list</button>
                    </div>


                    <div className="date" >
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleCalendarChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeInputLabel="Time:"
                            showTimeInput
                        />

                    </div>

                    <div className= "description-box" >
                        <textarea

                            className = "text-box-input"
                            cols="33"
                            type="text"
                            placeholder="description"

                        />
                    </div>
                    
                    <div className="upload-submit" >
                        <button>upload image</button>
                        <button>submit challenge</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Submit
