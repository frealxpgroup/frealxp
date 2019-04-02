import React, { Component } from 'react'
import './Edit.scss'
import { connect } from 'react-redux'
import { updateEverything } from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Logout from '../../Components/Logout/Logout'
// import PasswordModal from '../../Components/PasswordModal/PasswordModal'

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
            billZip: '',
            modalShow: false
        }
    }
    componentDidMount() {
        const { user_id } = this.state
        axios.post(`/shop/address`, { user_id })
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
        this.setState({ [prop]: val })
        console.log(this.state[prop])
    }

    // handleReset = () => {
    //     this.setState({ modalShow: true })
    // }

    handleCancel = () => {
        window.location.reload()
    }

    handleSave = () => {
        const { shipAddress1, shipAddress2, shipCity, shipState, shipZip, billAddress1, billAddress2, billCity, billState, billZip, user_id, first_name, last_name, email } = this.state
        axios.put('/shop/address', { shipAddress1, shipAddress2, shipCity, shipState, shipZip, billAddress1, billAddress2, billCity, billState, billZip, user_id })
            .then(response => {
                console.log(response)

            })
        axios.put('/auth/edit', { first_name, last_name, email, user_id })
            .then(response => {
                console.log(response.data)
                this.props.updateEverything(response.data)
            })
        
    }

    render() {
        console.log(this.state.user_id)
        // let modalClose = () => this.setState({ modalShow: false });
        return (
            <div className='edit-main'>
                <Link to='/dashboard'><h1>FRealXP</h1></Link>
                <Logout />
                <div className='input-box'>
                    <div className='editor one'>
                        <h2>Basic Info</h2>
                        <div className='img-circle'><div id='background'>Upload Image</div></div>
                        <div className='inputs'></div>
                        <input type='text' title='first name' placeholder='first name' onChange={(e) => this.handleInput('first_name', e.target.value)} defaultValue={this.state.first_name} />
                        <input placeholder='last name' onChange={(e) => this.handleInput('last_name', e.target.value)} defaultValue={this.state.last_name} />
                        <input placeholder='email' onChange={(e) => this.handleInput('email', e.target.value)} defaultValue={this.state.email} />
                        <Link to='/dashboard'><button>Back to Dash</button></Link>
                    </div>
                    <div className='editor two'>
                        <h2>Shipping Address</h2>
                        <div className='inputs'></div>
                        <input placeholder='address line 1' defaultValue={this.state.shipAddress1} onChange={(e) => this.handleInput('shipAddress1', e.target.value)} />
                        <input placeholder='address line 2' defaultValue={this.state.shipAddress2} onChange={(e) => this.handleInput('shipAddress2', e.target.value)} />
                        <input placeholder='city' defaultValue={this.state.shipCity} onChange={(e) => this.handleInput('shipCity', e.target.value)} />
                        <input placeholder='state' defaultValue={this.state.shipState} onChange={(e) => this.handleInput('shipState', e.target.value)} />
                        <input placeholder='zip' defaultValue={this.state.shipZip} onChange={(e) => this.handleInput('shipZip', e.target.value)} />
                        <button onClick={this.handleSave}>Save Changes</button>

                    </div>
                    <div className='editor three'>
                        <h2>Billing Address</h2>
                        <div className='inputs'></div>
                        <input placeholder='address line 1' defaultValue={this.state.billAddress1} onChange={(e) => this.handleInput('billAddress1', e.target.value)} />
                        <input placeholder='address line 2' defaultValue={this.state.billAddress2} onChange={(e) => this.handleInput('billAddress2', e.target.value)} />
                        <input placeholder='city' defaultValue={this.state.billCity} onChange={(e) => this.handleInput('billCity', e.target.value)} />
                        <input placeholder='state' defaultValue={this.state.billState} onChange={(e) => this.handleInput('billState', e.target.value)} />
                        <input placeholder='zip' defaultValue={this.state.billZip} onChange={(e) => this.handleInput('billZip', e.target.value)} />
                        <button onClick={this.handleCancel}>Cancel Changes</button>
                    </div>

                </div>
                {/* <PasswordModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    email={this.state.email}
                /> */}
            </div>
        )
    }
}

const mapToProps = (reduxState) => {
    const { user_id, email, first_name, last_name } = reduxState
    return {
        user_id, email, first_name, last_name
    }
}

export default connect(mapToProps, { updateEverything })(Edit)