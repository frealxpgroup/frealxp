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
                <h1>Welcome, {this.props.first_name}!</h1>
                <Logout className='logout' />
                <div className='box left'>
                    <h2>My XP: {this.props.xp}</h2>
                    <h2>My Challenges:</h2>
                    <h3></h3>
                </div>
                <div className='box right name'>
                    
                    <div>
                        <Link to='/auth/edit'><h3>Edit Account Info</h3></Link>
                        <Link to='/history'><h3>My History</h3></Link>
                        <Link to='/challenge/board'><h3>Challenge Board</h3></Link>
                        <Link to='/shop'><h3>Shop</h3></Link>
                    </div>

                </div>
                <div className='box right quote'>

                </div>

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