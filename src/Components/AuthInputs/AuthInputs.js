import React, { Component } from 'react'
import './AuthInputs.scss'
import axios from 'axios'

class AuthInputs extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            hasAccount: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            verifyPassword: ''
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
        console.log(this.state)
    }
    handleRegister = () => {
        const {email, password, firstName, lastName, verifyPassword} = this.state
        console.log('hi!')
        console.log(this.state)
        if(password !== verifyPassword){
            window.alert('Password does not match')
        }
        axios.post('/auth/register', {email, password, firstName, lastName})
        .then(res => {
            console.log("props", this.props.history)
        }).catch(err => {
            console.log(err)
            window.alert('Invalid Credentials.  Please Try again.')
        }   
        )
    }
    render() {
        return (
            <div>
                {
                    this.state.hasAccount
                        ?
                        <div className='inputs'>
                            <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)} />
                            <input placeholder='password' type='password' onChange={(e) => this.handleInput('password', e.target.value)}/>
                            <div className='button-div'>
                                <button onClick={() => this.handleToggle()}>CREATE ACCOUNT</button>
                                <button>LOGIN</button>
                            </div>

                        </div>
                        :
                        <div className='inputs'>
                            <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)}/>
                            <input placeholder='password' type='password' onChange={(e) => this.handleInput('password', e.target.value)}/>
                            <input placeholder='verify password' type='password' onChange={(e) => this.handleInput('verifyPassword', e.target.value)}/>
                            <input placeholder='first name' onChange={(e) => this.handleInput('firstName', e.target.value)}/>
                            <input placeholder='last name' onChange={(e) => this.handleInput('lastName', e.target.value)}/>
                            <div className='button-div'>
                                <button onClick={() => this.handleToggle()}>Go Back</button>
                                <button onClick={this.handleRegister}>CREATE ACCOUNT</button> 
                            </div>

                        </div>
                }


            </div>
        )
    }
}

export default AuthInputs