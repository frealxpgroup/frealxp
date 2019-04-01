import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import {connect} from 'react-redux'

class ChallengeModal extends React.Component {
  constructor(props){
        super(props)
        this.state = {
          challenges: this.props.challenges,
          user_id: this.props.user_id
          
          
        }
    }
    
    AddTrackedChallenge = () => {
      const {user_id} = this.state
      const {id} = this.props
      const {challenge_title} = this.props
      
      console.log(id)
      console.log(challenge_title)
        Axios.post(`/challenge/accepted`, { user_id, id, challenge_title })
        .then(res => {
          console.log("IT WORKED")
        })
      
  }

    render() {
        let {challenges} = this.props
        
        const mappedChallenges = challenges.map((challenge, i) => {
            if(challenge.challenge_id === this.props.id){
            return(
                <div key={challenge.challenge_id}>
                    <h1>{challenge.challenge_title}</h1>
                    <h1>{challenge.description}</h1>
                    <h1>{challenge.challenge_point_value} XP</h1>
                    <h1>{challenge.challenge_id}</h1>
                    <button onClick={this.AddTrackedChallenge}>Accept</button>
                </div>
            )
            }
            else {return console.error('err');
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

  const mapToProps = (reduxState) => {
    const {user_id} = reduxState
    
    return{
        user_id,
        
    }
}

  export default connect(mapToProps)(ChallengeModal)
  