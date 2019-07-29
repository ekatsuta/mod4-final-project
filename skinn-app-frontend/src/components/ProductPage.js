import React from 'react';

export default class ProductPage extends React.Component {

  renderPickItemBtn(){
    return (
      <button onClick={() => this.props.swapItem(this.props.product)}>PICK ITEM</button>
    )
  }

  renderBrowseCategoryBtn(){
    return (
      <button>BROWSE MORE ITEMS</button>
    )
  }

  render () {

    return (
      <div className="product-page">
        <div className="product-page-info">
          <h3> {this.props.product.name} </h3>
          <div className="product-page-image-container">
            <img src={this.props.product.img_path} />
          </div>
        </div>
        <div className="product-page-description">
          <h3>Brand</h3>
          <p>{this.props.product.brand}</p>
          <h3>Description</h3>
          <p>{this.props.product.description} </p>
          {this.props.pathName === "browse" ? this.renderPickItemBtn() : this.renderBrowseCategoryBtn()}
        </div>
      </div>

    )
  }
}
