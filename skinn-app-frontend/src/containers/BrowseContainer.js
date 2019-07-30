import React from 'react'
import StepCard from '../components/StepCard'
import FilterBar from './FilterBar'
import SearchBar from './SearchBar'

class Browse extends React.Component {

  state = {
    skintype: null,
    brand: null,
    searchTerm: null
  }

  renderStepCards(products){
    if (products.length === 0) {
      return (
        <h3>No product match found!</h3>
      )
    } else {
      return products.map(product => {
        return (
          <StepCard pathName="browse" path={this.props.match.path} handleProductClick={this.props.handleProductClick} key={product.id} product={product} browse={this.props.browse} />
        )
      })
    }
  }

  renderProducts(){
    if (this.state.skintype && this.state.brand) {
      const filteredProducts = this.props.products.filter(product => {
        return product.skintype === this.state.skintype && product.brand === this.state.brand
      })
      return this.renderStepCards(filteredProducts)
    } else if (this.state.skintype) {
      const filteredProducts = this.props.products.filter(product => {
        return product.skintype === this.state.skintype
      })
      return this.renderStepCards(filteredProducts)
    } else if (this.state.brand) {
      const filteredProducts = this.props.products.filter(product => {
        return product.brand === this.state.brand
      })
      return this.renderStepCards(filteredProducts)
    } else if (this.state.searchTerm) {
      const filteredProducts = this.props.products.filter(product => {
        return product.brand.includes(this.state.searchTerm) || product.name.includes(this.state.searchTerm)
      })
      return this.renderStepCards(filteredProducts)
    } else {
      return this.renderStepCards(this.props.products)
    }
  }


  // Should move up the state from FilterBar & SearchBar
  filterProductsBySkin = (skintype) => {
    // const filteredProducts = this.props.products.filter(product => {
    //   return product.skintype === skintype
    // })
    this.setState({
      skintype: skintype
    })
  }

  filterProductsByBrand = (brand) => {
    // const filteredProducts = this.props.products.filter(product => {
    //   return product.brand === brand
    // })
    this.setState({
      brand: brand
    })
  }

  handleSearch = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm
    })
  }

  render(){

    return (
      <div className="browse-container">
        <div className="search-filter-container">
          <SearchBar handleSearch={this.handleSearch}/>
          <FilterBar filterProductsBySkin={this.filterProductsBySkin} filterProductsByBrand={this.filterProductsByBrand} products={this.props.products}/>
        </div>
        <div className="browse-products-container">
        {this.renderProducts()}
        </div>
      </div>
    )
  }
}

export default Browse
