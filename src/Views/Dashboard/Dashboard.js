import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Dashboard.scss'
import Logout from '../../Components/Logout/Logout'

class Dashboard extends Component{
    componentDidMount(){
        if(!this.props.first_name){
            this.props.history.push('/')
        }
    }
    render(){
        console.log(this.props)
        return (
            <div className='dash-main'>
                <h1>FRealXP</h1>
                <p style={{'fontStyle':'italic'}}>“Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.” -Roy T. Bennett</p>
                <p>Hi, {this.props.first_name}!</p>
                <Logout />
            </div>
        )
    }

}

const mapToProps = (reduxState) => {
    const { first_name, last_name } = reduxState
    return {
        first_name, last_name
    }
}

export default connect(mapToProps)(Dashboard)