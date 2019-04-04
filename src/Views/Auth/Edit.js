import React, { Component } from 'react'
import './Edit.scss'
import { connect } from 'react-redux'
import { updateEverything } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logout from '../../Components/Logout/Logout'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';

// import PasswordModal from '../../Components/PasswordModal/PasswordModal'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user_id,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            email: this.props.email,
            shipAddress1: '',
            shipAddress2: '',
            shipCity: '',
            shipState: '',
            shipZip: '',
            billAddress1: '',
            billAddress2: '',
            billCity: '',
            billState: '',
            billZip: '',
            modalShow: false,
            isUploading: false,
            url: ''
        }
    }
    componentDidMount() {
        const { user_id } = this.state
        axios.post(`/shop/address`, { user_id })
            .then(res => {
                console.log(res.data)
                if (!res.data) {
                    axios.post('/shop/address/add', { user_id })

                }
                this.setState({
                    shipAddress1: res.data.shipping_line_one,
                    shipAddress2: res.data.shipping_line_two,
                    shipCity: res.data.shipping_city,
                    shipState: res.data.shipping_state,
                    shipZip: res.data.shipping_zip,
                    billAddress1: res.data.billing_line_one,
                    billAddress2: res.data.billing_line_two,
                    billCity: res.data.billing_city,
                    billState: res.data.billing_state,
                    billZip: res.data.billing_zip
                })
            })

    }

    handleInput = (prop, val) => {
        this.setState({ [prop]: val })
        console.log(this.state[prop])
    }

    // handleReset = () => {
    //     this.setState({ modalShow: true }) 
    // }

    handleCancel = () => {
        window.location.reload()
    }

    handleSave = () => {

        const { shipAddress1, shipAddress2, shipCity, shipState, shipZip, billAddress1, billAddress2, billCity, billState, billZip, user_id, first_name, last_name, email } = this.state
        axios.put('/shop/address', { shipAddress1, shipAddress2, shipCity, shipState, shipZip, billAddress1, billAddress2, billCity, billState, billZip, user_id })
            .then(response => {
                console.log(response)

            })
        axios.put('/auth/edit', { first_name, last_name, email, user_id })
            .then(response => {
                console.log(response.data)
                this.props.updateEverything(response.data)
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


    render() {
        console.log(this.state.user_id)
        // let modalClose = () => this.setState({ modalShow: false });
        const { url, isUploading } = this.state;
        return (
            <div className='edit-main'>
                <Link to='/dashboard'><h1>FRealXP</h1></Link>
                <Logout />
                <div className='input-box'>
                    <div className='editor one'>
                        <h2>Basic Info</h2>
                        <div className='img-circle'>
                            <div id='background'>
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
                                                    /> : <p>Profile Image Here</p>}
                                                </div>
                                            )}
                                        </Dropzone>


                                    </div>
                                    : <img className='dropzone' src={url} alt="" />
                                }
                            </div>
                        </div>
                        <div className='inputs'></div>
                        <input type='text' title='first name' placeholder='first name' onChange={(e) => this.handleInput('first_name', e.target.value)} defaultValue={this.state.first_name} />
                        <input placeholder='last name' onChange={(e) => this.handleInput('last_name', e.target.value)} defaultValue={this.state.last_name} />
                        <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)} defaultValue={this.state.email} />
                        <Link to='/dashboard'><button>Back to Dash</button></Link>
                    </div>
                    <div className='editor two'>
                        <h2>Shipping Address</h2>
                        <div className='inputs'></div>
                        <input placeholder='address line 1' defaultValue={this.state.shipAddress1} onChange={(e) => this.handleInput('shipAddress1', e.target.value)} />
                        <input placeholder='address line 2' defaultValue={this.state.shipAddress2} onChange={(e) => this.handleInput('shipAddress2', e.target.value)} />
                        <input placeholder='city' defaultValue={this.state.shipCity} onChange={(e) => this.handleInput('shipCity', e.target.value)} />
                        <input placeholder='state' defaultValue={this.state.shipState} onChange={(e) => this.handleInput('shipState', e.target.value)} />
                        <input placeholder='zip' defaultValue={this.state.shipZip} onChange={(e) => this.handleInput('shipZip', e.target.value)} />
                        <button onClick={this.handleSave}>Save Changes</button>

                    </div>
                    <div className='editor three'>
                        <h2>Billing Address</h2>
                        <div className='inputs'></div>
                        <input placeholder='address line 1' defaultValue={this.state.billAddress1} onChange={(e) => this.handleInput('billAddress1', e.target.value)} />
                        <input placeholder='address line 2' defaultValue={this.state.billAddress2} onChange={(e) => this.handleInput('billAddress2', e.target.value)} />
                        <input placeholder='city' defaultValue={this.state.billCity} onChange={(e) => this.handleInput('billCity', e.target.value)} />
                        <input placeholder='state' defaultValue={this.state.billState} onChange={(e) => this.handleInput('billState', e.target.value)} />
                        <input placeholder='zip' defaultValue={this.state.billZip} onChange={(e) => this.handleInput('billZip', e.target.value)} />
                        <button onClick={this.handleCancel}>Cancel Changes</button>
                    </div>

                </div>
                {/* <PasswordModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    email={this.state.email}
                /> */}
            </div>

        )
    }
}

const mapToProps = (reduxState) => {
    const { user_id, email, first_name, last_name } = reduxState
    return {
        user_id, email, first_name, last_name
    }
}

export default connect(mapToProps, { updateEverything })(Edit)