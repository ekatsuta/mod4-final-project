import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

const StepCard = (props) => {

  function renderDescription(){
    return (
      <div className="middle">
        <p className="product-description">{props.product.description}</p>
      </div>
    )
  }

  function renderSwapButton(){
    return (
      <div className="middle">
        <button className="swap-button">PICK ME</button>
      </div>
    )
  }


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
