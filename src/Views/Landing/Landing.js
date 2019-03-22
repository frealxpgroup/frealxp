import React from 'react'
import './Landing.scss'
import {Link} from 'react-router-dom'

const Landing = (props) => {
    return(
        <div className='landing-main'>
            <h1>FRealXP</h1>
            <Link to='/auth'><h2>Login/Register</h2></Link>
            <span>Life is about the experiences you make</span>
            <Link to='/challenge/board'><button>CLICK TO EXPLORE</button></Link>
        </div>
    )
    
}
export default Landing