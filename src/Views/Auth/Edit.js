import React, { Component } from 'react'
import './Edit.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import Logout from '../../Components/Logout/Logout'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user_id,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            email: this.props.email,
            shipAddress1: '',
            shipAddress2: '',
            shipCity: '',
            shipState: '',
            shipZip: '',
            billAddress1: '',
            billAddress2: '',
            billCity: '',
            billState: '',
            billZip: ''
        }
    }
    componentDidMount(){
        const {user_id} = this.state
        axios.post(`/shop/address`, {user_id})
        .then(res => {
            console.log(res.data)
            this.setState({
                shipAddress1: res.data.shipping_line_one,
                shipAddress2: res.data.shipping_line_two,
                shipCity: res.data.shipping_city,
                shipState: res.data.shipping_state,
                shipZip: res.data.shipping_zip,
                billAddress1: res.data.billing_line_one,
                billAddress2: res.data.billing_line_two,
                billCity: res.data.billing_city,
                billState: res.data.billing_state,
                billZip: res.data.billing_zip
            })
        })
    }

    handleInput = (prop, val) => {
        this.setState({[prop]: val})
        console.log(this.state[prop])
    }

    handleBack = () => {
        this.props.history.push('/dashboard')
    }

    handleCancel = () => {
        window.location.reload()
    }

    handleSave = () => {
        
    }

    render() {
        console.log(this.state.user_id)
        return (
            <div className='edit-main'>
                <h1>FRealXP</h1>
                <Logout />
                <div className='input-box'>
                        <div className='editor one'>
                            <h2>Basic Info</h2>
                            <div className='img-circle'><div id='background'>Upload Image</div></div>
                            <div className='inputs'></div>
                            <input type='text' title='first name' placeholder='first name' onChange={(e) => this.handleInput('first_name', e.target.value)} defaultValue={this.state.first_name}/>
                            <input placeholder='last name' defaultValue={this.state.last_name}/>
                            <input placeholder='email' defaultValue={this.state.email}/>
                            <button onClick={this.handleBack}>Back to Dash</button>
                        </div>
                        <div className='editor two'>
                            <h2>Shipping Address</h2>
                            <div className='inputs'></div>
                            <input placeholder='address line 1' defaultValue={this.state.shipAddress1}/>
                            <input placeholder='address line 2' defaultValue={this.state.shipAddress2}/>
                            <input placeholder='city' defaultValue={this.state.shipCity}/>
                            <input placeholder='state' defaultValue={this.state.shipState}/>
                            <input placeholder='zip' defaultValue={this.state.shipZip}/>
                            <button>Save Changes</button>
                            
                        </div>
                        <div className='editor three'>
                            <h2>Billing Address</h2>
                            <div className='inputs'></div>
                            <input placeholder='address line 1' defaultValue={this.state.billAddress1}/>
                            <input placeholder='address line 2' defaultValue={this.state.billAddress2}/>
                            <input placeholder='city' defaultValue={this.state.billCity}/>
                            <input placeholder='state' defaultValue={this.state.billState}/>
                            <input placeholder='zip' defaultValue={this.state.billZip}/>
                            <button onClick={this.handleCancel}>Cancel Changes</button>
                        </div>

                    </div>
                
            </div>
        )
    }
}

const mapToProps = (reduxState) => {
    const {user_id, email, first_name, last_name} = reduxState
    return{
        user_id, email, first_name, last_name
    }
}

export default connect(mapToProps)(Edit)