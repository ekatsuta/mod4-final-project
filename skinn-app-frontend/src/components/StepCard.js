import React from 'react'

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
    <div className={props.browse ? "browse-card" : "step-card"}>
      <p className="product-number">{props.browse ? null : props.idx + 1}</p>
      <p>{props.product.name}</p>
      <p>{props.product.brand}</p>
        <div className="product-image-container">
          <img className="product-image" src={props.product.img_path} />
          {props.browse ? renderSwapButton() : renderDescription()}
        </div>
    </div>
  )
}

export default StepCard
