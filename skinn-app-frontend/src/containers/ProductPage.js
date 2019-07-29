import React from 'react';
import StarRatingInput from "../components/StarRatingInput";
import ReviewCard from "../components/ReviewCard";

export default class ProductPage extends React.Component {
  //review forms
  state = {
    notes: "",
    rating: 1,
    reviews: [],
    oneReview: null,
    select: false,
  }

  handleChange = (event) => {
    this.setState({
      oneReview: {...this.state.oneReview, [event.target.name]: event.target.value}
    });
  };



  handleSubmit = event => {
    event.preventDefault();

    if (this.state.select){
      fetch(`http://localhost:3000/reviews/${this.state.oneReview.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          rating: this.state.oneReview.rating,
          notes: this.state.oneReview.notes,
          product_id: this.props.productID,
          user_id: this.props.userID
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log("one review", this.state.oneReview)
          console.log("data", data)
          //update one object in state array
          let updatedReview = this.state.reviews.map(review => {
            if (review.id === this.state.oneReview.id){
              return this.state.oneReview
            } else {
              return review
            }
          })

          this.setState({
            reviews: updatedReview,
            select: false,
          })
        })

    } else {
      fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          rating: this.state.oneReview.rating,
          notes: this.state.oneReview.notes,
          product_id: this.props.productID,
          user_id: this.props.userID
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("back from post", data)

          this.setState({
            reviews: [...this.state.reviews, data],
            select: false,
          })
        });
    }
  };

  componentDidMount() {
    fetch("http://localhost:3000/reviews")
      .then(r => r.json())
      .then(data => {
        this.setState({
          reviews: data
        })

      })
  }

  handleEdit = (oneReview) => {
    // console.log("one review", oneReview)
    this.setState({
      oneReview: oneReview,
      select: true
    });

  }


  renderReviews = () => {
    let filteredReviews = this.state.reviews.filter(review => review.product_id === this.props.product.id)
    // console.log("Render", filteredReviews)
    return filteredReviews.map(review => {
      return <ReviewCard key={review.id} review={review} handleEdit={this.handleEdit} />
    })
  }

  render () {
    console.log("productPage", this.state)
    return (
      <div>
        <h3> product page </h3>
        <h3> product page </h3>
        <h3> {this.props.product.name} </h3>
        <form onSubmit={this.handleSubmit}>

          <StarRatingInput
          value={this.state.oneReview ? this.state.oneReview.rating : this.state.rating}
          name="rating"
          onClick={this.handleChange}/>
          <br />
          <textarea onChange={this.handleChange} name="notes" value={this.state.oneReview ? this.state.oneReview.notes : this.state.notes} rows="4" cols="50" type="text" placeholder="Review product here"/>
          <input type="submit" value="Submit" />
        </form>
        <div className="reviews-container">
          {
            this.renderReviews()
          }
        </div>

      </div>

    )
  }
}
