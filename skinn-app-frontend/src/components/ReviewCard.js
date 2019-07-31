import React from 'react';
import StarRating from './StarRating'

class ReviewCard extends React.Component {

  renderUser = () => {

   if (this.props.review) {
      let foundUser = this.props.users.find(user => {
        return this.props.review.user_id === user.id
      })
      console.log("foundUser", foundUser.user_skintype)
      return foundUser.username

    }

  }

  renderUserSkintype = () => {
    if (this.props.review) {
      let foundUser = this.props.users.find(user => {
        return this.props.review.user_id === user.id
      })
      console.log("foundUser", foundUser.user_skintype)
      return foundUser.user_skintype

    }
  }


  render() {
    console.log("Review card", this.props)
    return(
      <div className="review-card">
        <strong>Rating: </strong>
        <StarRating rating={this.props.review.rating} />
        <br />
        <p> written by: {this.renderUser()}</p>
        <p> skintype: {this.renderUserSkintype()} </p>
        <p> {this.props.review.notes}</p>
        <button onClick={() => {this.props.handleEdit(this.props.review)}}>Edit Review</button>
        <button onClick={() => {this.props.handleDelete(this.props.review)}}>Delete Review</button>
      </div>
    )
  }
}

export default ReviewCard
