import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import '../../Views/Challenge/Submit.scss'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { connect } from 'react-redux'
// import SubmitModal from './SubmitModal'
import {Link} from 'react-router-dom'


import "react-datepicker/dist/react-datepicker.css";



class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userChallenges: [],
            description: "",
            isUploading: false,
            url: '',
            selectedChallenge: null,
            user_id: this.props.user_id,
            challengesShow: true,
            challengeID: 0,
            checked: 'unchecked'
        };
        //binding handleCalanderChange
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
    }

    //methods
    componentDidMount(){
        this.getChallengesButton()
    }

    //This will handle any input values that need to update state. Currently being used to update this.state.description
    handleChange(prop, val) {
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

    //this will handle the user's image upload
    handleImageUpload = () => {
        console.log("Upload image button hit")
    }

    //this button will get all the challenges that the user has accepted. 
    //The data from the database is put on state.
    getChallengesButton = () => {
        const { user_id } = this.state
        axios.post(`/challenge/tracked/one`, { user_id })
            .then(res => {
                this.setState({
                    userChallenges: res.data,
                    // challengesShow: !this.state.challengesShow
                })
            })
    }

    //Submit button for user. This will send applicable data to backend/db
    handleSubmitChallenge = () => {
        console.log('submit challenge button hit')
        const { user_id, description, startDate, challengeID, url } = this.state
        axios.put(`/challenge/submit`, { description, startDate, user_id, url, challengeID })
            .then(res => { 
                console.log(res.data) 
                this.props.history.push('/dashboard')
            })
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios
            .get('/sign-s3', {
                params: {
                    'file-name': fileName,
                    'file-type': file.type,
                },
            })
            .then(response => {
                const { signedRequest, url } = response.data;
                this.uploadFile(file, signedRequest, url);
            })
            .catch(err => {
                console.log(err);
            });
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            },
        };

        axios
            .put(signedRequest, file, options)
            .then(response => {
                this.setState({ isUploading: false, url });
                // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
            })
            .catch(err => {
                this.setState({
                    isUploading: false,
                });
                if (err.response.status === 403) {
                    alert(
                        `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                        err.stack
                        }`
                    );
                } else {
                    alert(`ERROR: ${err.status}\n ${err.stack}`);
                }
            });
    };


    // handleButtonClick = (v) => {
    //     this.setState({
    //         challengeID: v
    //     })
    //     console.log(this.state.challengeID)
    // }



    //end of methods, start of render
    render() {
        console.log("this is the user's tracked challenges: ", this.state.userChallenges)
        const { url, isUploading } = this.state;
        // let modalClose = () => this.setState({ modalShow: false });


        let challengeDisplay = this.state.userChallenges.map((val, ind) => {
            console.log(val)
            // this.setState({
            //     challengeID: val.challenge_id
            // })
            return (
                <div
                    key={val.challenge_id}
                    id={val.challenge_id}
                    onClick={() => this.setState({ challengeID: val.challenge_id, selectedChallenge: val.title})} >
                    <button className='selected-challenges'> - {val.title} - </button>

                    {/* <div>{val.user_id}</div>
                    <div>{val.challenge_id}</div>
                    <div>{val.completion_date}</div>
                    <div>{val.approved_date}</div>
                    <div>{val.image}</div>
                    <div>{val.description}</div>
                    <div>{val.judge_feedback}</div> */}
                    {/* <button onClick={this.setState({challengeID: val.challenge_id})}>Select</button> */}

                </div>
            )
        })
        console.log(this.state.challengeID)


        return (
            <div className="submit-main">
                <Link to='/dashboard'><h1>FRealXP</h1></Link>
                <p className='date-title'>Selected Challenge: {this.state.selectedChallenge}</p>
                <div>
                    <div className="select-challenge" >

                        <button className='challenge-button' onClick={this.getChallengesButton} >Select Challenge to Submit</button>

                        {challengeDisplay}

                    </div>

                    
                    <div>
                    {!url
                        ? <div className='dropzone'>
                            <Dropzone
                                onDropAccepted={this.getSignedRequest}
                                style={{
                                    position: 'relative',
                                    width: 250,
                                    height: 250,
                                    borderWidth: 7,
                                    marginTop: 100,
                                    borderColor: 'rgb(102, 102, 102)',
                                    borderStyle: 'dashed',
                                    borderRadius: 5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: 28,
                                }}
                                accept="image/*"
                                multiple={false}
                            >
                                {/* {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>} */}
                                {({ getRootProps }) => (
                                    <div {...getRootProps()}>
                                        {isUploading ? <GridLoader
                                        /> : <p>Drop Challenge Image Here</p>}
                                    </div>
                                )}
                            </Dropzone>


                        </div>
                        : <img className='dropzone' src={url} alt="" />
                    }
                    </div>
                    
                    <p className='date-title'>Select Date:</p>
                    <div className="date" >
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleCalendarChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeInputLabel="Time:"
                            // showTimeInput
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
                        <button className='challenge-button' onClick={this.handleSubmitChallenge}>Submit Challenge</button>
                    </div>
                </div>
                <div>



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
