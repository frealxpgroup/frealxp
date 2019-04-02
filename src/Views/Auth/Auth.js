import React, { Component } from 'react'
// import AuthInput from './../../Components/AuthInputs/AuthInputs'
import './Auth.scss'
import axios from 'axios'
import { updateEverything } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { validateRegister } from './AuthLogic'

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasAccount: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            verifyPassword: '',
            passwordsMatch: true,
            handleError: ''
        }
    }
    handleToggle = () => {
        this.setState({
            hasAccount: !this.state.hasAccount
        })
    }
    handleInput = (property, val) => {
        this.setState({
            [property]: val,
            handleError: ''
        })
    }


    handleRegister = () => {
        const { email, password, firstName, lastName, verifyPassword } = this.state

        let returnError = validateRegister(email, password, firstName, lastName, verifyPassword)

        if(returnError){
            this.setState({
                handleError: returnError
            })
            return;
        }
        
        // let emailValid = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)
        // if (!emailValid) {
        //     this.setState({
        //         handleError: 'Please enter a valid email address.'
        //     })
        //     return;
        // } else if (!password) {
        //     this.setState({
        //         handleError: 'Please enter a password '
        //     })
        //     return;
        // } else if (password !== verifyPassword) {
        //     this.setState({
        //         handleError: 'Passwords do not match.  Please try again.'
        //     })
        //     return;
        // } else if (!firstName) {
        //     this.setState({
        //         handleError: 'Please enter a first name.'
        //     })
        //     return;
        // } else if (!lastName) {
        //     this.setState({
        //         handleError: 'Please enter a last name.'
        //     })
        //     return;
        // }

        axios.post('/auth/register', { email, password, firstName, lastName })
            .then(res => {
                console.log(res.data)
                this.props.updateEverything(res.data)
                this.props.history.push('/dashboard')
            }).catch(err => {
                console.log(err)
                window.alert("User already exists.  Please try again")

            }
            )
    }

    handleLogin = () => {
        const { email, password } = this.state
        let emailValid = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)
        if (!emailValid) {
            this.setState({
                handleError: 'Please enter a valid email address.'
            })
            return;
        } else if (!password) {
            this.setState({
                handleError: 'Please enter a password'
            })
            return;
        }

        axios.post('/auth/login', { email, password })
            .then(res => {
                console.log(res.data)
                this.props.updateEverything(res.data)
                this.props.history.push('/dashboard')
            }).catch(err => {
                console.log(err)
                this.setState({
                    handleError: 'Invalid password. Please try again.'
                })
            })
    }
    render() {
        console.log("props", this.props)
        return (
            <div className='auth-main'>
                <h1>FRealXP</h1>
                <div className='input-box'>
                    <div>
                        {
                            this.state.hasAccount
                                ?
                                <div className='inputs'>
                                    <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)} />
                                    <input placeholder='password' type='password' onChange={(e) => this.handleInput('password', e.target.value)} />
                                    <div className='button-div'>
                                        <button onClick={() => this.handleToggle()}>CREATE ACCOUNT</button>
                                        {!this.state.handleError
                                            ? <button onClick={this.handleLogin}>LOGIN</button>
                                            : <button style={{ 'color': 'grey', 'borderColor': 'grey' }}>LOGIN</button>}
                                    </div>
                                    <p style={{ 'color': 'red', 'fontSize': 17, 'margin': 10, 'textAlign': 'center' }}>{this.state.handleError}</p>
                                </div>
                                :
                                <div className='inputs'>
                                    <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)} />
                                    <input placeholder='password' type='password' onChange={(e) => this.handleInput('password', e.target.value)} />
                                    <input placeholder='verify password' type='password' onChange={(e) => this.handleInput('verifyPassword', e.target.value)} />
                                    <input placeholder='first name' onChange={(e) => this.handleInput('firstName', e.target.value)} />
                                    <input placeholder='last name' onChange={(e) => this.handleInput('lastName', e.target.value)} />
                                    <div className='button-div'>
                                        <button onClick={() => this.handleToggle()}>Go Back</button>
                                        {!this.state.handleError
                                            ? <button onClick={this.handleRegister}>CREATE ACCOUNT</button>
                                            : <button style={{ 'color': 'grey', 'borderColor': 'grey' }}>CREATE ACCOUNT</button>}

                                    </div>
                                    <p style={{ 'color': 'red', 'fontSize': 17, 'margin': 10, 'textAlign': 'center' }}>{this.state.handleError}</p>
                                </div>
                        }


                    </div>
                </div>
            </div>
        )
    }
}

const mapToProps = (reduxState) => {
    const {first_name} = reduxState
    return{
        first_name
    }
}

export default connect(mapToProps,{updateEverything})(Auth)