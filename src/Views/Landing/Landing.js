import React from 'react'
import './Landing.scss'
import { Link } from 'react-router-dom'

const Landing = (props) => {
    return (
        <div className='landing-main'>
            <h1>FRealXP</h1>
            <Link to='/auth'><h2>Login/Register</h2></Link>
            <Link to='/auth'><div className='dots' role='button'>. . .</div></Link>
            <div className='bottom-container'>
                <span>Life is about the experiences you make</span>
                <Link to='/challenge/board'><button className='desktop-button'>CLICK TO EXPLORE</button></Link>
                <Link to='/challenge/board'><button className='mobile-button'>TAP TO EXPLORE</button></Link>
            </div>

        </div>
    )

}
export default Landing 