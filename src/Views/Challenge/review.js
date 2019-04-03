import React, { Component } from "react";
import "./review.scss";

class Review extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="review_background">
        <div className="review_nav">
            <div className='review_logo'>FrealXP</div>
        </div>
        <div className="review_body_content">
          Main box
          <div className="review_body_content_row1">
            <div className="review_challenge_title">title</div>
            <div className="review_date">date</div>
          </div>
          <div className="review_body_content_row2">
            <div className="review_description">description</div>
            <div className="review_image">image</div>
          </div>
          <div className="review_feedback">feedback</div>
          <div className="review_body_content_row4">
            <div className="review_button">SEND BACK</div>
            <div className="review_button">APPROVE</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;
