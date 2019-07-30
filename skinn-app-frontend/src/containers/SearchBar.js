import React from 'react'

const SearchBar = (props) => {

  return(
    <div className="search-bar">
      <input onChange={props.handleSearch} value={props.searchTerm} placeholder="🔍 Search"/>
    </div>
  )
}

export default SearchBar
