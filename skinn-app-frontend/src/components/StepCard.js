import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

class StepCard extends React.Component {



  renderDescription(){
    return (
      <div className="middle">
        <p className="product-description">{this.props.product.description}</p>
      </div>
    )
  }

  renderSwapButton(){
    return (
      <div className="middle">
        <button className="swap-button" onClick={this.props.handleSwap}>LEARN MORE</button>
      </div>
    )
  }

  renderSteps(){
    return (
      <div className="ten-step-title">
        <p className="product-number">{this.props.category.id}</p>
        <p className="product-category">{this.props.category.name.toUpperCase()}</p>
      </div>
    )
  }

  render(){

  return(
      <div onClick={() => {this.props.handleProductClick(this.props.product.id)}} className={this.props.path === '/browse' ? "browse-card" : "step-card"}>
          {this.props.path === '/browse' ? null : this.renderSteps()}
          <Link to={`/${this.props.pathName}/${this.props.product.id}`}>
            <div className="product-image-container">
              <img className="product-image" src={this.props.product.img_path} />
              {this.props.path === '/browse' ? this.renderSwapButton() : this.renderDescription()}
            </div>
          </Link>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.brand}</p>
      </div>
    )
  }
}

export default StepCard
