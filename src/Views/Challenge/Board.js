import React, { Component } from 'react'
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem';
import './Board.scss'
import ChallengeModal from '../../Components/Challenge/ChallengeModal'
import { Link } from "react-router-dom";

class Board extends Component {
    constructor() {
        super()
        this.state = {
            challenges: [],
            challengeInput: '',
            modalShow: false,
            id: 0,
            challenge_title: ''
        }
    }
    getAllChallenges = () => {
        Axios.get(`/challenges`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    challenges: res.data,
                    
            
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
        if (prevState.challengeInput !== this.state.challengeInput) { this.getOneChallenge() }
    }
    handleChallengeInput = () => {
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
        console.log(this.state.challenge_title)
        let modalClose = () => this.setState({ modalShow: false });
        const mappedChallenges = this.state.challenges.map((challenge, i) => {
            

            return (
                <div
                    className='allchallengesinboard'
                    key={challenge.challenge_id}
                    id={challenge.challenge_id}
                    onClick={() => this.setState({ modalShow: true, id: challenge.challenge_id, challenge_title: challenge.challenge_title })} >

                    <div className='boardchallengebox'>

                        <h3 className='boardtitle' > {challenge.challenge_title} </h3>
                        <h2 className='boardpoints' >{challenge.challenge_point_value}</h2>
                        <img src={challenge.challenge_logos} className='boardimage' alt='' />


                    </div>
                </div>
            )
        })
        return (
            <div className='challengeboardpage'>
            <Link to="/dashboard">
            <h1>FRealXP</h1>
          </Link>

                <Dropdown>

                    <DropdownButton id="dropdown-item-button" title="Filter" className='boardfilter'>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput3} >Outdoors</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput4} >New Skill</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput2} >Animals</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.handleChallengeInput} >Water Based</Dropdown.Item>
                        <DropdownItem as='button' onClick={this.getAllChallenges}>Get All</DropdownItem>
                    </DropdownButton>




                </Dropdown>
                <ChallengeModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    challenges={this.state.challenges}
                    id={this.state.id}
                    challenge_id={this.state.challenges.challenge_id}
                    challenge_title={this.state.challenge_title}
                />
    
                {mappedChallenges}
            </div>

        )
    }
}
export default Board