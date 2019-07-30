import React from 'react'

export default class FilterBar extends React.Component {

  state = {
    skintype: null,
    brand: null
  }

  handleSkintypeChange = (event) => {
    event.persist()
    this.setState({
      skintype: event.target.value.toLowerCase()
    }, () => this.props.filterProductsBySkin(this.state.skintype))
  }

  handleBrandChange = (event) => {
    event.persist()
    this.setState({
      brand: event.target.value
    }, () => this.props.filterProductsByBrand(this.state.brand))
  }

  renderBrandOptions(){
    const brandNames = this.props.products.map(product => {
      return product.brand
    })
    const uniqueBrandNames = [...new Set(brandNames)]

    return uniqueBrandNames.map(brand => {
      return (
        <option>{brand}</option>
      )
    })
  }

  render(){
    console.log(this.state.skintype)
    return(
      <div className="filter-bar">
        <p>Filter By:</p>
        <select onChange={this.handleSkintypeChange}>
          <option value="" disabled selected>SKINTYPE</option>
          <option>DRY</option>
          <option>OILY</option>
          <option>COMBINATION</option>
          <option>ALL</option>
        </select>
        <select onChange={this.handleBrandChange}>
          <option value="" disabled selected>BRAND</option>
          {this.renderBrandOptions()}
        </select>
      </div>

    )
  }
}
