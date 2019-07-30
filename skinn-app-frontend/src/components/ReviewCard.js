import React from 'react';
import StarRating from './StarRating'

class ReviewCard extends React.Component {

  render() {
    // console.log("Review card", this.props.review)
    return(
      <div>
        <strong>Rating: </strong>
        <StarRating rating={this.props.review.rating} />
        <br />
        <p> {this.props.review.notes}</p>
        <button onClick={() => {this.props.handleEdit(this.props.review)}}>Edit Review</button>
        <button onClick={() => {this.props.handleDelete(this.props.review)}}>Delete Review</button>
      </div>
    )
  }
}

export default ReviewCard
