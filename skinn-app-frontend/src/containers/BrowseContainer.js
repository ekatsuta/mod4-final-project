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
        return product.brand.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      })
      return this.renderStepCards(filteredProducts)
    } else {
      return this.renderStepCards(this.props.products)
    }
  }


  // Should move up the state from FilterBar & SearchBar
  handleSkintypeChange = (event) => {
    event.persist()
    this.setState({
      skintype: event.target.value.toLowerCase()
    })
  }

  handleBrandChange = (event) => {
      event.persist()
    this.setState({
      brand: event.target.value
    })
  }

  handleSearch = (event) => {
    event.persist()
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleClear = () => {
    this.setState({
      skintype: null,
      brand: null,
      searchTerm: null
    })
  }

  render(){
    return (
      <div className="browse-container">
        <div className="search-filter-container">
          <SearchBar handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
          <FilterBar handleSkintypeChange={this.handleSkintypeChange} handleBrandChange={this.handleBrandChange} products={this.props.products} handleClear={this.handleClear}/>
        </div>
        <div className="browse-products-container">
        <h3>{this.props.category ? this.props.category.name.toUpperCase() + "S" : "ALL PRODUCTS"}</h3>
        {this.renderProducts()}
        </div>
      </div>
    )
  }
}

export default Browse
