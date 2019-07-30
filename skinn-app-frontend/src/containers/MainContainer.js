import React from 'react'
import StepCard from '../components/StepCard'

class MainContainer extends React.Component {

  // componentDidMount(){
  //   this.props.getCurrentUser()
  // }

  render(){
    return(
      <div className="main-container">
        <h3>Hi {this.props.currentUser.name}!</h3>
        <h3>Your 10 Step Skincare</h3>
        {this.props.products.map((product, idx) => {
          return <StepCard key={product.id} category={product.category} product={product.product} idx={idx} handleProductClick={this.props.handleProductClick} browse={this.props.browse} pathName="products"/>
        })}
      </div>
    )
  }
}

export default MainContainer
