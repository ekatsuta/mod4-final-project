import React from 'react'

export default class SearchBar extends React.Component {

  state = {
    searchTerm: null
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, () => this.props.handleSearch(this.state.searchTerm))
  }

  render(){
    return(
      <div className="search-bar">
        <input onChange={this.handleChange} value={this.searchTerm} placeholder="🔍 Search"/>
      </div>
    )
  }


}
