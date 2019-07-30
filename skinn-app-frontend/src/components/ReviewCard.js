import React from 'react';
import StarRating from './StarRating'

class ReviewCard extends React.Component {

  renderUser = () => {
    // console.log("user id who wrote this", this.props.review.user_id)
    let foundUser = this.props.users.find(user => {
      return this.props.review.user_id === user.id
    })
    console.log("foundUser", foundUser)
    return foundUser.name
  }


  render() {
    console.log("Review card", this.props)
    return(
      <div className="review-card">
        <strong>Rating: </strong>
        <StarRating rating={this.props.review.rating} />
        <br />
        <p> written by: {this.renderUser()} </p>
        <p> {this.props.review.notes}</p>
        <button onClick={() => {this.props.handleEdit(this.props.review)}}>Edit Review</button>
        <button onClick={() => {this.props.handleDelete(this.props.review)}}>Delete Review</button>
      </div>
    )
  }
}

export default ReviewCard
