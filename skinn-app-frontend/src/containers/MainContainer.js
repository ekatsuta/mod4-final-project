import React from 'react'
import StepCard from '../components/StepCard'

class MainContainer extends React.Component {

  render(){
    debugger
    return(
      <div className="main-container">
        <h3>Hi {this.props.currentUser.name}!</h3>
        <h3>Your 10 Step Skincare</h3>
        {this.props.products.map((product, idx) => {
          return <StepCard pathName="products" key={product.id} product={product.product} category={product.category} handleProductClick={this.props.handleProductClick} browse={this.props.browse}/>
        })}
      </div>
    )
  }
}

export default MainContainer
