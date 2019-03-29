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
                    <h2>Lvl {this.props.xp}</h2>
                </div>
                <div className='box right name'>
                    <h2>{this.props.first_name}'s Dash</h2>
                    <div>
                        <Link to='/auth/edit'><h3>Edit Account Info</h3></Link>
                        <Link to='/history'><h3>My History</h3></Link>
                        <Link to='/challenge/board'><h3>Challenge Board</h3></Link>
                        <Link to='/shop'><h3>Shop</h3></Link>
                    </div>

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