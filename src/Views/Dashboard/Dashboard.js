import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Dashboard.scss'
import Logout from '../../Components/Logout/Logout'
import axios from 'axios'

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            challenges: []
        }
    }
    componentDidMount() {
        if (!this.props.first_name) {
            this.props.history.push('/')
        }
        const {user_id} = this.props
        axios.post(`/challenge/tracked/one`, {user_id})
        .then(res => {
            // console.log(res.data)
            this.setState({
                challenges: res.data
            })
            console.log(this.state.challenges)
        })
    }
    render() {
        console.log(this.props)
        let mappedChallenges = this.state.challenges.map(el => {
            return( <div>-{el.title}</div>)
        })
      
        console.log(this.state.challenges)
        return (
            <div className='dash-main'>
                <h1>FRealXP</h1>
                <Logout className='logout' />
                <div className='box left'>
                    <h2>Welcome, {this.props.first_name}!</h2>
                    <h2>XP: {this.props.xp}</h2>
                    <h2>Challenges:</h2>
                    {this.state.challenges[0]
                        ? mappedChallenges
                        : <span>No challenges selected!</span>
                    }
                    
                    <Link to='/challenge/submit'><button>Submit a Challenge</button></Link>
                </div>
                <div className='right'>
                    <div className='top box'>
                        <h3 style={{'textDecoration':'underline'}}>Quick Links</h3>
                        <Link to='/auth/edit'><h3>Edit Account Info</h3></Link>
                        <Link to='/history'><h3>My History</h3></Link>
                        <Link to='/challenge/board'><h3>Challenge Board</h3></Link>
                        <Link to='/shop'><h3>Visit Shop</h3></Link>
                        {this.props.judge
                            ? <Link to='/challenge/review'><h3>Review a Challenge</h3></Link>
                            : null
                        }
                        
                    </div>
                    {/* <div className='middle box'>
                        <h3>My Photos</h3>
                        <img className='photo' src='http://www.iconarchive.com/download/i43804/itzikgur/my-seven/Pictures-Nikon.ico' alt=''/>
                    </div> */}

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
    const { first_name, last_name, xp, judge, user_id } = reduxState
    return {
        first_name, last_name, xp, judge, user_id
    }
}

export default connect(mapToProps)(Dashboard)