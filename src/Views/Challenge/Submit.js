import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import '../../Views/Challenge/Submit.scss'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';

import "react-datepicker/dist/react-datepicker.css";



class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userChallenges: [],
            selectedChallenge: "",
            description: "",
            isUploading: false,
            url: ''
        };
        //binding handleCalanderChange
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
        // axios.get(`/challenges/user`)
        // .then(res => { })

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

    render() {
        const { url, isUploading } = this.state;
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

                    <div className="description-box" >
                        <textarea

                            className="text-box-input"
                            cols="33"
                            type="text"
                            placeholder="description"

                        />
                    </div>
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

                    

                    <div className="upload-submit" >
                        <button>submit challenge</button>
                    </div>
                </div>
                <div>



                </div>
            </div>
        )
    }
}

export default Submit
