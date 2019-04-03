import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import '../../Views/Challenge/Submit.scss'
import { connect } from 'react-redux'
import SubmitModal from './SubmitModal'


import "react-datepicker/dist/react-datepicker.css";



class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userChallenges: [],
            selectedChallenge: '',
            description: "",
            user_id: this.props.user_id,
            modalShow: false
        };
        //binding handleCalanderChange
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
    }

    //START OF METHODS

    //Handles input values. Currently being used to update this.state.description
    handleChange(prop, val) {
        console.log(val)
        this.setState({
            [prop]: val
        })
    }

    //Handles date selection
    handleCalendarChange(date) {
        this.setState({
            startDate: date
        });
    }
    
    //Grabs the user's tracked challenges and puts on state when the pages loads
    componentDidMount= () => {
        const { user_id } = this.state
        
        axios.post(`/challenge/tracked/one`, { user_id })
        .then(res => {
            this.setState({ 
                userChallenges: res.data,
            }) 
        })
        console.log(this.state.userChallenges)
    }
    
    //Shows the modal of the user's tracked challenges
    getChallengesButton= () => {
        this.setState({
            modalShow: true
        })         
    }

    //Submit button for user. This will send applicable data to backend/db
    handleSubmitChallenge = () => {
        console.log('submit challenge button hit')


        const {user_id, description, startDate, selectedChallenge, userChallenges } = this.state
        console.log(userChallenges[0])

        // axios.post(`/challenge/submit`, {user_id, description, startDate, selectedChallenge})
        // .then(res => {console.log('good to go')})
    }


    //END OF METHODS, START OF RENDER
    render() {
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <div className="submit-main">
                <h1>FRealXP</h1>
                <div>
                    <div className="select-challenge" >

                        <button onClick={this.getChallengesButton} >select your challenge</button>

                        <SubmitModal
                            show={this.state.modalShow}
                            onHide={modalClose}
                            userchallenges={this.state.userChallenges}
                        />
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

                    <div className="description-box" >
                        <textarea

                            className="text-box-input"
                            cols="33"
                            type="text"
                            placeholder="description"
                            onChange={e => this.handleChange('description', e.target.value)}

                        />
                    </div>

                    <div className="upload-submit" >
                        <button onClick={this.handleImageUpload}>upload image</button>
                        <button onClick={this.handleSubmitChallenge}>submit challenge</button>
                    </div>

                </div>
            </div>
        )
    }
}

const mapToProps = (reduxState) => {
    const { user_id } = reduxState
    return {
        user_id
    }
}

export default connect(mapToProps)(Submit)
