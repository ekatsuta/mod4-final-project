import React from 'react';

class ReviewCard extends React.Component {

  render() {
    // console.log("Review card", this.props.review)
    return(
      <div>
        <h3> {this.props.review.rating}</h3>
        <p> {this.props.review.notes}</p>
        <button onClick={() => {this.props.handleEdit(this.props.review)}}>Edit Review</button>
        <button onClick={() => {this.props.handleDelete(this.props.review)}}>Delete Review</button>
      </div>
    )
  }
}

export default ReviewCard
