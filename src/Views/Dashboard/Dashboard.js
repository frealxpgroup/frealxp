import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Dashboard.scss'
import Logout from '../../Components/Logout/Logout'

class Dashboard extends Component {
    componentDidMount() {
        if (!this.props.first_name) {
            this.props.history.push('/')
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className='dash-main'>
                <h1>FRealXP</h1>
                <Logout className='logout' />
                <div className='box left'>
                    <h2>Welcome, {this.props.first_name}!</h2>
                    <h2>My XP: {this.props.xp}</h2>
                    <h2>My Challenges:</h2>
                    
                    <Link to='/challenge/submit'><button>Submit a Challenge</button></Link>
                </div>
                <div className='right'>
                    <div className='top box'>
                        <Link to='/auth/edit'><h3>Edit Account Info</h3></Link>
                        <Link to='/history'><h3>My History</h3></Link>
                        <Link to='/challenge/board'><h3>Challenge Board</h3></Link>
                        <Link to='/shop'><h3>Shop</h3></Link>
                        
                    </div>
                    <div className='middle box'>
                        <h3>My Photos</h3>
                        <img className='photo' src='http://www.iconarchive.com/download/i43804/itzikgur/my-seven/Pictures-Nikon.ico' alt=''/>
                    </div>

                    <div className='bottom box'>
                        <p>“Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.” -Roy T. Bennett</p>
                    </div>

                </div>
                {/* <div className='box right quote'>

                </div> */}

            </div>
        )
    }

}

const mapToProps = (reduxState) => {
    const { first_name, last_name, xp } = reduxState
    return {
        first_name, last_name, xp
    }
}

export default connect(mapToProps)(Dashboard)