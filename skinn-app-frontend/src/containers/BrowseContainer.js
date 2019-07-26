import React from 'react'
import StepCard from '../components/StepCard'

class Browse extends React.Component {

  renderProductByCategory(category){
    const filteredProducts = this.props.products.filter(product => {
      return product.category.name === category
    })

    return filteredProducts.map(product => {
      return <StepCard key={product.id} product={product} browse={this.props.browse}/>
    })
  }

  render(){
    return (
      <div className="browse-container">
        <h3>Oil Cleansers</h3>
          <div className="category-container">
          {this.renderProductByCategory("oil cleanser")}
          </div>
        <h3>Water Base Cleansers</h3>
          <div className="category-container">
          {this.renderProductByCategory("water based cleanser")}
          </div>  
        <h3>Exfoliator</h3>
          <div className="category-container">
          {this.renderProductByCategory("exfoliator")}
          </div>  
        <h3>Toner</h3>
          <div className="category-container">
          {this.renderProductByCategory("toner")}
          </div>  
        <h3>Serum</h3>
          <div className="category-container">
          {this.renderProductByCategory("serum")}
          </div>  
        <h3>Mask</h3>
          <div className="category-container">
          {this.renderProductByCategory("mask")}
          </div>  
        <h3>Eyecream</h3>
          <div className="category-container">
          {this.renderProductByCategory("eyecream")}
          </div>  
        <h3>Moisturizer</h3>
          <div className="category-container">
          {this.renderProductByCategory("moisturizer")}
          </div>  
        <h3>Sunscreen</h3>
          <div className="category-container">
          {this.renderProductByCategory("sunscreen")}
          </div>  
        <h3>Facial Oil</h3>
          <div className="category-container">
          {this.renderProductByCategory("facial oil")}
          </div>  
      </div>
    )
  }
}

export default Browse
