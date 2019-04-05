import React, { Component } from "react";
import "./review.scss";
import { connect } from "react-redux";
import axios from "axios";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
      date: "",
      challengeID: 0,
      userID: 0,
      feedback: ""
    };
  }
  //START OF METHODS

  getTrackedChallenges = () => {
    axios.get(`/challenge/review`).then(res => {
      let dateConverter = new Date(res.data.completion_date)
        .toString()
        .split(" ")
        .splice(0, 4)
        .join(" ");

      this.setState({
        title: res.data.title,
        description: res.data.description,
        image: res.data.image,
        date: dateConverter,
        challengeID: res.data.challenge_id,
        userID: res.data.user_id
      });
    });
  };

  componentDidMount() {
    this.getTrackedChallenges();
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  challengeApproved = () => {
    const { challengeID, userID, feedback } = this.state;
    //send an update to tracker db with feedback. keep completion date null
    axios.put(`/challenge/approved`, { challengeID, userID, feedback } )
      .then((res) => {
        console.log('hello')
      }).then(() => {window.location.reload()})
    };

  challengeDenied = () => {
    //send an update to tracker db with feedback and completion date entered
    const { challengeID, userID, feedback } = this.state;
    axios
      .put(`/challenge/denied`, { challengeID, userID, feedback })
      .then((res) => {window.location.reload()
      });
  };

  //END OF METHODS, START OF RENDER
  render() {
    const { image } = this.state;
    return (
      <div className="review_background">
        <div className="review_nav">
          <div className="review_logo">FrealXP</div>
        </div>
        <div className="review_body_content">
          <div className="review_body_content_inner">
            <div className="review_body_content_row1">
              <div className="review_challenge_title">
                Challenge: {this.state.title}
              </div>
              <div className="review_date">{this.state.date}</div>
            </div>
            <div className="review_body_content_row2">
              <div className="review_description">
                Description: {this.state.description}
              </div>
              <img src={image} alt="" className="review_image" />
            </div>
            <textarea
              placeholder="feedback"
              className="review_feedback"
              onChange={e => this.handleChange("feedback", e.target.value)}
            />
            <div className="review_body_content_row4">
              <div onClick={this.challengeDenied} className="review_button">
                SEND BACK
              </div>
              <div onClick={this.challengeApproved} className="review_button">APPROVE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapToProps = reduxState => {
  const { user_id } = reduxState;
  return {
    user_id
  };
};

export default connect(mapToProps)(Review);
