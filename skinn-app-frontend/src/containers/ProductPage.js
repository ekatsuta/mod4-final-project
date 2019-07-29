import React from 'react';

export default class ProductPage extends React.Component {
  //review forms

  render () {
    console.log("productPage", this.props.product.name)
    return (
      <div>
      <h3> product page </h3>
      <h3> product page </h3>
      <h3> product page </h3>
      <h3> product page </h3>
      <h3> {this.props.product.name} </h3>

      </div>

    )
  }
}
