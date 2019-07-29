import React from 'react'
import { Link } from 'react-router-dom'


class NavBar extends React.Component {

  render(){
    return(
      <React.Fragment>
      <div className="navbar">
        <div className="nav-buttons">
        <Link to="/browse" style={{ textDecoration: 'none' }}><button>BROWSE</button></Link>
          <Link to="/quiz" style={{ textDecoration: 'none' }}><button>QUIZ PAGE</button></Link>
          <Link to="/login" style={{ textDecoration: 'none' }}><button>LOG IN</button></Link>
        </div>
        <Link to="/home" style={{ textDecoration: 'none', padding: 50 }}><h3 className="logo">SKINN</h3></Link>
      </div>
      </React.Fragment>

    )
  }
}

export default NavBar
