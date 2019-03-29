import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import axios from 'axios'
import { updateEverything } from '../../ducks/reducer'
import './Logout.scss'

class Logout extends Component{
    handleLogout = () => {
        axios.post('/auth/logout')
            .then(res => {
                const clearState = {
                    user_id: 0,
                    first_name: '',
                    last_name: '',
                    email: '',
                    judge: false,
                    profile_pic: '',
                    xp: 0
                    }
                this.props.updateEverything(clearState)
                this.props.history.push('/')

            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        return(
            <span className='logout-span' onClick={this.handleLogout}>LOGOUT</span>
        )
    }
}


export default withRouter(connect(null, {updateEverything})(Logout))