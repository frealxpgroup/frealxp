import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import {connect} from 'react-redux'
import './Modal.scss'

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
                    <h1 className='modaltitle'>{challenge.challenge_title}</h1>
                    <h2 className='modaldescription'>{challenge.description}</h2>
                    <h1 className='modalpoints'>{challenge.challenge_point_value} XP</h1>
                    
                    
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
             
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            {mappedChallenges}
            <Button onClick={this.AddTrackedChallenge} onClick={this.props.onHide}>Accept</Button>
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
  