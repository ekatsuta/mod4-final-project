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
    <div  onClick={() => {props.handleProductClick(props.product.id)}} className={props.path === '/browse' ? "browse-card" : "step-card"}>

        <p className="product-number">{props.path === '/browse' ? null : props.idx + 1}</p>
        <p>{props.product.name}</p>
        <p>{props.product.brand}</p>
        <Link to={`/products/${props.product.id}`}>
          <div className="product-image-container">
            <img className="product-image" src={props.product.img_path} />
            {props.path === '/browse' ? renderSwapButton() : renderDescription()}
          </div>
        </Link>
    </div>
  )
}

export default StepCard
