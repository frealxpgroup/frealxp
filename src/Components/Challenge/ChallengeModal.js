import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

class ChallengeModal extends React.Component {
    
    AddTrackedChallenge = () => {
        Axios.post(`/challenge/accepted`)
        .then(res => {

        })
    }

    render() {
        let {challenges} = this.props
        console.log(challenges)
        const mappedChallenges = challenges.map((challenge, i) => {
            if(challenge.challenge_id === this.props.id){
            return(
                <div key={challenge.challenge_id}>
                    <h1>{challenge.challenge_title}</h1>
                    <h1>{challenge.description}</h1>
                    <h1>{challenge.challenge_point_value} XP</h1>
                    <button onClick={this.AddTrackedChallenge}>Accept</button>
                </div>
            )
            }
  
        })
        
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            {mappedChallenges}
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  export default ChallengeModal
  