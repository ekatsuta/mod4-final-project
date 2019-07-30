import React from 'react'
import StepCard from '../components/StepCard'

class Browse extends React.Component {

  // renderProductByCategory(category){
  //   const filteredProducts = this.props.products.filter(product => {
  //     return product.category.name === category
  //   })
  //
  //   return filteredProducts.map(product => {
  //     return <StepCard pathName="browse" path={this.props.match.path} handleProductClick={this.props.handleProductClick} key={product.id} product={product} browse={this.props.browse}/>
  //   })
  // }

  renderProducts(){
    return this.props.products.map(product => {
      return (
        <StepCard pathName="browse" path={this.props.match.path} handleProductClick={this.props.handleProductClick} key={product.id} product={product} browse={this.props.browse} />
      )
    })
  }

  render(){
    return (
      <div className="browse-container">
        {this.renderProducts()}
      </div>
    )
  }
}

export default Browse
