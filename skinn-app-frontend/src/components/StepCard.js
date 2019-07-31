import React from 'react';
import { Link } from 'react-router-dom'


class StepCard extends React.Component {


  renderDescription(){
    return (
      <div className="middle">
        <div className="product-description">
        <h5>WHAT IT DOES:</h5>
        <p>{this.props.category.whatitdoes}</p>
        <h5>HOW TO:</h5>
        <p>{this.props.category.howto}</p>
        <img src={this.props.category.image_src} alt="category logo"/>
        </div>
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
    console.log(this.props.product)
    return(
      <div  onClick={() => {this.props.handleProductClick(this.props.product.id)}} className={this.props.pathName === 'browse' ? "browse-card" : "step-card"}>

          {this.props.pathName === 'browse' ? null : this.renderSteps() }
          <Link to={`/${this.props.pathName}/${this.props.product.id}`}>
            <div className="product-image-container">
              <img className="product-image" src={this.props.product.img_path} alt="product"/>
              {this.props.pathName === 'browse' ? this.renderSwapButton() : this.renderDescription()}
            </div>
          </Link>
          <p className="brand-title">{this.props.product.brand}</p>
          <p className="product-title">{this.props.product.name}</p>
      </div>
    )
  }
}

export default StepCard
