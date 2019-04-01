import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class SubmitModal extends React.Component{

    render(){
        let challengeDisplay = this.props.userChallenges.map((val, ind) => {
            return (
                <div key={ind} >
                    {console.log(val)}
                    <div>{val.title}</div>
                    <div><button>Select</button></div>
                </div>
            )
        })

        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Choose a vehicle
                </Modal.Title>
              </Modal.Header>
              <Modal.Body >
                  <div >
                    {challengeDisplay} 
                  </div>
                
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }
}

export default SubmitModal;