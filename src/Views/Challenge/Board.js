import React, { Component } from 'react'
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import './Board.scss'

class Board extends Component {
    constructor() {
        super()
        this.state = {
            challenges: [],
            challengeInput: ''
        }
    }
    getAllChallenges = () => {
        Axios.get(`/challenges`)
            .then(res => {

                this.setState({
                    challenges: res.data
                })
            })
    }
    componentDidMount = () => {
        this.getAllChallenges()
    }
    getOneChallenge = () => {
        const { challengeInput } = this.state;

        console.log('hello')
        Axios.post(`/challenges/one`, { challengeInput })
            .then(res => {
                this.setState({
                    challenges: res.data
                })
            })
    }
    componentDidUpdate = (prevProps, prevState) => {
       if(prevState.challengeInput !== this.state.challengeInput)
       {this.getOneChallenge()}
    }
    handleChallengeInput = (value) => {
        this.setState({
            challengeInput: 'Water Based'
        })
    }
    handleChallengeInput2 = () => {
        this.setState({
            challengeInput: 'Animals'
        })
    }
    handleChallengeInput3 = () => {
        this.setState({
            challengeInput: 'Outdoors'
        })
    }
    handleChallengeInput4 = () => {
        this.setState({
            challengeInput: 'New Skill'
        })
    }
    render() {
        const mappedChallenges = this.state.challenges.map((challenge, i) => {


            return (
                <div className='allchallengesinboard' key={challenge.challenge_id} id={challenge.challenge_id}>
                    <div className='boardchallengebox'>

                        <h3 className='boardtitle' > {challenge.challenge_title} </h3>
                        {/* <h4 className='boardcategory'>{challenge.category}</h4> */}
                        <h2 className='boardpoints' >{challenge.challenge_point_value}</h2>
                        {/* <h5 className='boarddescription'>{challenge.description}</h5> */}
                    </div>
                </div>
            )
        })
        return (
            <div className='challengeboardpage'>Challenge Board Page
                
                <Dropdown>
                
                    <DropdownButton id="dropdown-item-button" title="Filter">
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput3} >Outdoors</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput4} >New Skill</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput2} >Animals</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput} >Water Based</Dropdown.Item>
                        <DropdownItem as='button' onClick={this.getAllChallenges}>Get All</DropdownItem>
                    </DropdownButton>
                      
                    

             
                </Dropdown>
                {/* <input className='filter' onChange={(e) => { this.handleChallengeInput(e.target.value) }}
                    type='text'
                    value={this.state.challengeInput}
                    placeholder='Water Based'></input>
                <input className='filter' onChange={(e) => { this.handleChallengeInput2(e.target.value) }}
                    t ype='text'
                    value={this.state.challengeInput}
                    placeholder='Animals'></input>
                <input className='filter' onChange={(e) => { this.handleChallengeInput3(e.target.value) }}
                    type='text'
                    value={this.state.challengeInput}
                    placeholder='Outdoors'></input>
                <input className='filter' onChange={(e) => { this.handleChallengeInput4(e.target.value) }}
                    type='text'
                    value={this.state.challengeInput}
                    placeholder='New Skill'></input> */}

                {/* <button className='addbutton' onClick={this.getOneChallenge}></button> */}
                {mappedChallenges}
            </div>

        )
    }
}
export default Board