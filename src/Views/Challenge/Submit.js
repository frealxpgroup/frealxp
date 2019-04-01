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
            description: "",
            user_id: 3
        };
        //binding handleCalanderChange
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
    }

    //methods

    //This will handle any input values that need to update state. Currently being used to update this.state.description
    handleChange(prop,val){
        console.log(val)
        this.setState({
            [prop]: val
        })
    }

    //handles date selection
    handleCalendarChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleImageUpload = () => {
        console.log("Upload image button hit")
    }

    //this button will get all the challenges that the user has accepted. The data from the database is put on state.
    getChallengesButton = () => {
        const {user_id} = this.state

        //need to setup redux so that I can pass the logged in user_id to req.body
        axios.get(`/challenges/user`, {user_id})
        .then(res => { this.setState({userChallenges: res}) })
        console.log("this is the user's tracked challenges: ", this.state.userChallenges)
        console.log('this is the type of the users tracked challenges:', typeof this.state.userChallenges)
    }

    handleSubmitChallenge = () => {
        //this will be a post request to send the data over to the db tracker table
        console.log('submit challenge button hit')
    }



    render() {
        console.log(this.state.startDate)
        return (
            <div className="submit-main">
                <h1>FRealXP</h1>
                <div>
                    <div className="select-challenge" >
                        <button onClick={this.getChallengesButton} >select your challenge</button>
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
                            onChange={e => this.handleChange('description', e.target.value)}

                        />
                    </div>
                    
                    <div className="upload-submit" >
                        <button onClick = {this.handleImageUpload}>upload image</button>
                        <button onClick = {this.handleSubmitChallenge}>submit challenge</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Submit
