import React from 'react';
import StarRatingInput from "../components/StarRatingInput";
import ReviewCard from "../components/ReviewCard";
import StarRating from '../components/StarRating'
import { Link } from 'react-router-dom'

export default class ProductPage extends React.Component {
  //review forms
  state = {
    notes: "",
    rating: 0,
    reviews: [],
    oneReview: null,
    select: false,

  }

  handleChange = (event) => {
    this.setState({
      oneReview: {...this.state.oneReview, [event.target.name]: event.target.value},
      [event.target.name]: event.target.value
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
          user_id: this.props.userID.id
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
          user_id: this.props.userID.id
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

  handleDelete = (thing) => {
    console.log("delete this review", thing.id)
    fetch(`http://localhost:3000/reviews/${thing.id}`, {
      method: "DELETE",
    })
      .then( r => r.json())
      .then( data => {
        console.log("removed", data)
        var newItems = this.state.reviews.filter((review) => {
          return review.id !== thing.id});
      this.setState({ reviews: newItems });
      })
  }


  renderReviews = () => {
    let filteredReviews = this.state.reviews.filter(review => review.product_id === this.props.product.id)
    // console.log("Render", filteredReviews)
    return filteredReviews.map(review => {
      return <ReviewCard users={this.props.users} user={this.props.userID} key={review.id} review={review} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
    })
  }

  renderPickItemBtn(){
    return (
      <button className="pick-item-button" onClick={() => this.props.swapItem(this.props.product)}>PICK ITEM</button>
    )
  }

  renderBrowseCategoryBtn(){
    return (
      <Link to={`/categories/${this.props.product.category.id}`}>BROWSE MORE ITEMS</Link>
    )
  }

    averageRating = (arr) => {
      const filteredReviews = this.state.reviews.filter(review => review.product_id === this.props.product.id)
      const sum = filteredReviews.map(review => {
        return review.rating
      })
      const arrSum = (sum) => {
        return sum.reduce((a,b) => {
          return a + b
        }, 0) / sum.length
      }
      return arrSum(sum)

    }

  render () {
    console.log("productPage", this.props, "state", this.state)
    return (
      <div>

        <div className="product-page">
          <div className="product-page-info">
            <h3> {this.props.product.name}</h3>
            <h4> Average Rating:  <div>
                <StarRating maxRating={5} rating={this.averageRating(this.state.reviews)}/>
            </div>
            </h4>

            <div className="product-page-image-container">
              <img src={this.props.product.img_path} alt="product"/>
            </div>
          </div>
          <div className="product-page-description">
            <h3>Brand</h3>
            <p>{this.props.product.brand}</p>
            <h3>Description</h3>
            <p>{this.props.product.description} </p>
            {this.props.pathName === "browse" ? this.renderPickItemBtn() : this.renderBrowseCategoryBtn()}
          <form className="review-form" onSubmit={this.handleSubmit}>
          <div>
            <StarRatingInput
            maxRating={5}
            value={this.state.oneReview ? this.state.oneReview.rating : this.state.rating}
            name="rating"
            onClick={this.handleChange}/>
          </div>
            <br />
            <textarea onChange={this.handleChange} name="notes" value={this.state.oneReview ? this.state.oneReview.notes : this.state.notes} rows="4" cols="50" type="text" placeholder="Review product here"/>
            <input type="submit" value="Submit" />
          </form>
          </div>
        </div>



        <div className="reviews-container">
          {
            this.renderReviews()
          }
        </div>

      </div>
    )
  }
}
