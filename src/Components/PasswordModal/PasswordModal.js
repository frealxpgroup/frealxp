import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './PasswordModal.scss'

class PasswordModal extends React.Component {
    constructor(props){
        super(props)

        this.state={
            currentPassword: '',
            newPassword: '',
            verifyNewPassword: '',
            Error: 'Test Error'
        }
    }

    handleGetUser = () => {
        
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
                        <input placeholder='Current Password' defaultValue={this.state.currentPassword}/>
                        <input placeholder='New Password' defaultValue={this.state.newPassword}/>
                        <input placeholder='Verify New Password' defaultValue={this.state.verifyNewPassword}/>
                    </div>
                    <p>{this.state.Error}</p>

                </Modal.Body>
                <Modal.Footer>
                    <button >Save New Password</button>
                    <button onClick={this.props.onHide}>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PasswordModal