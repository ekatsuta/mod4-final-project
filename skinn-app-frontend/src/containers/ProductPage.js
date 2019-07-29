import React from 'react';
import StarRatingInput from "../components/StarRatingInput";

export default class ProductPage extends React.Component {
  //review forms
  state = {
    notes: "",
    rating: 1,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };



  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...this.state,
        product_id: this.props.productID,
        user_id: this.props.userID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
  };

  render () {
    console.log("productPage", this.props)
    return (
      <div>
        <h3> product page </h3>
        <h3> product page </h3>
        <h3> {this.props.product.name} </h3>
        <form onSubmit={this.handleSubmit}>

          <StarRatingInput
          value={this.state.rating}
          name="rating"
          onClick={this.handleChange}/>
          <br />
          <textarea onChange={this.handleChange} name="notes" value={this.state.notes} rows="4" cols="50" type="text" placeholder="Review product here"/>
          <input type="submit" value="Submit" />
        </form>

      </div>

    )
  }
}
