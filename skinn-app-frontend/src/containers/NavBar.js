import React from 'react'

class NavBar extends React.Component {


  render(){
    return(
      <div className="navbar">
        <h3 onClick={this.props.handleHome} className="logo">SKINN</h3>
        <div className="nav-buttons">
          <button onClick={this.props.handleBrowse}>BROWSE</button>
          <button>QUIZ PAGE</button>
          <button>LOG IN</button>
        </div>
      </div>
    )
  }
}

export default NavBar
