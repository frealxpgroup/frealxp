import React, { Component } from 'react'
// import AuthInput from './../../Components/AuthInputs/AuthInputs'
import './Auth.scss'
import axios from 'axios'

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
            sessionUser: {}
        }
    }
    handleToggle = () => {
        this.setState({
            hasAccount: !this.state.hasAccount
        })
    }
    handleInput = (property, val) => {
        this.setState({
            [property]: val
        })

    }
    handleRegister = () => {
        const { email, password, firstName, lastName, verifyPassword } = this.state

        if(!email){
            window.alert('Please enter a valid email address')
            return;
        } else if(!password){
            window.alert('Please enter a valid password')
            return;
        } else if (password !== verifyPassword) {
            window.alert('Passwords do not match. Please fix that')
            return;
        } else if(!firstName){
            window.alert('Please enter a first name')
            return;
        } else if (!lastName){
            window.alert('Please enter a last name')
            return;
        }

        axios.post('/auth/register', { email, password, firstName, lastName })
            .then(res => {
                this.setState({
                    sessionUser: res.data
                })
                this.props.history.push('/dashboard')
            }).catch(err => {
                console.log(err)
                window.alert("User already exists.  Please try again")
                
            }
            )
    }

    handleLogin = () => {
        const {email, password} = this.state
        if(!email){
            window.alert('Please enter a valid email address')
            return;
        } else if(!password){
            window.alert('Please enter a valid password')
            return;
        }
        
        axios.post('/auth/login', {email, password})
        .then(res => {
            this.setState({
                sessionUser: res.data
            })
            this.props.history.push('/dashboard')
        }).catch(err => {
            console.log(err)
            window.alert("Invalid username or password.  Please try again.")
        })
    } 
    render() {
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
                                        <button onClick={this.handleLogin}>LOGIN</button>
                                    </div>

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
                                        <button onClick={this.handleRegister}>CREATE ACCOUNT</button>
                                    </div>

                                </div>
                        }


                    </div>
                </div>
            </div>
        )
    }
}
export default Auth