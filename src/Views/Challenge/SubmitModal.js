import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


class SubmitModal extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        title: ''
      }
      this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    

    handleButtonClick(val){
       //select that challenge to update the db
      console.log(this.props.userchallenges)
      
      
    }

    render(){
        // let challengeDisplay = this.props.userchallenges.map((val, ind) => {
        //     return (

        //         <div key={ind} >
        //             <div onClick={this.handleButtonClick} >{val.title}</div>
        //         </div>
        //     )
        // })    

        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Select Challenge 
                </Modal.Title>
              </Modal.Header>
              <Modal.Body >
                  <div >
              
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