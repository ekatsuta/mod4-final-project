import React from 'react'

const FilterBar = (props) => {

  function renderBrandOptions(){
    const brandNames = props.products.map(product => {
      return product.brand
    })
    const uniqueBrandNames = [...new Set(brandNames)]

    return uniqueBrandNames.map(brand => {
      return (
        <option>{brand}</option>
      )
    })
  }

  return(
    <div className="filter-bar">
      <p>Filter By:</p>
      <select onChange={props.handleSkintypeChange}>
        <option value="" disabled selected>SKINTYPE</option>
        <option>DRY</option>
        <option>OILY</option>
        <option>COMBINATION</option>
        <option>ALL</option>
      </select>
      <select onChange={props.handleBrandChange}>
        <option value="" disabled selected>BRAND</option>
        {renderBrandOptions()}
      </select>
      <button onClick={props.handleClear}>CLEAR</button>
    </div>
  )

}

export default FilterBar
