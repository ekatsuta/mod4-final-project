import React from 'react';

class ReviewCard extends React.Component {

  render() {

    return(
      <div>
        <h3> {this.props.review.rating}</h3>
        <p> {this.props.review.notes}</p>
      </div>
    )
  }
}

export default ReviewCard
