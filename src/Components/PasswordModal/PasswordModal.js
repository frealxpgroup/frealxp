import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './PasswordModal.scss'
import axios from 'axios';

class PasswordModal extends React.Component {
    constructor(props){
        super(props)

        this.state={
            email: this.props.email,
            currentPassword: '',
            newPassword: '',
            verifyPassword: '',
            error: ''
        }
    }

    handleInput = (prop, val) => {
        this.setState({ [prop]: val })
        console.log(this.state[prop])
    }

    handleChangePassword = () => {
        const {email, currentPassword, newPassword, verifyPassword} = this.state
        axios.put('/auth/password', {email, password: currentPassword, newPassword, verifyPassword})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => 
            this.setState({
                error: err
            }))
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Reset Password
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='inputs-password'>
                        <input placeholder='Current Password' onChange={(e) => this.handleInput('password', e.target.value)} />
                        <input placeholder='New Password' onChange={(e) => this.handleInput('newPassword', e.target.value)} />
                        <input placeholder='Verify New Password' onChange={(e) => this.handleInput('verifyPassword', e.target.value)} />
                    </div>
                    

                </Modal.Body>
                <Modal.Footer>
                    <p style={{'color':'red'}}>{this.state.Error}</p>
                    <button onClick={this.handleChangePassword}>Save New Password</button>
                    <button onClick={this.props.onHide}>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PasswordModal