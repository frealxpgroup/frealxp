import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class SubmitModal extends React.Component{
  
    handleButtonClick = () => {
        console.log('add button clicked')
    }

    render(){
        let challengeDisplay = this.props.userchallenges.map((val, ind) => {
            return (
                <div key={ind} >
                    {console.log(val)}
                    <div>{val.title}</div>
                    <div><button onClick={this.handleButtonClick}>Select</button></div>
                </div>
            )
        })

        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Select Challenge 
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