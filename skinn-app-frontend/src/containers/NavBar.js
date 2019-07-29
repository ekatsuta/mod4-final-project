import React from 'react'
import { Link } from 'react-router-dom'


class NavBar extends React.Component {

  renderUserController(){
    return (
      <React.Fragment>
        <div className="dropdown">
        <Link to="/browse" style={{ textDecoration: 'none' }} className="dropbtn"><button>BROWSE</button></Link>
          <div class="dropdown-content">
            <a href="#">Oil Cleansers</a>
            <a href="#">Water Base Cleansers</a>
            <a href="#">Exfoliator</a>
            <a href="#">Toner</a>
            <a href="#">Serum</a>
            <a href="#">Mask</a>
            <a href="#">Eyecream</a>
            <a href="#">Moisturizer</a>
            <a href="#">Sunscreen</a>
            <a href="#">Facial Oil</a>


          </div>
        </div>
      <Link to="/quiz" style={{ textDecoration: 'none' }}><button>RETAKE QUIZ</button></Link>
      </React.Fragment>
    )
  }

  render(){
    return(
      <React.Fragment>
      <div className="navbar">
        <div className="nav-buttons">
          {this.props.currentUser ? this.renderUserController() : null}
          {this.props.currentUser ? null : <Link to="/login" style={{ textDecoration: 'none' }}><button>LOG IN</button></Link>}
          {this.props.currentUser ? <button onClick={this.props.logout}>LOG OUT</button> : null}
          {this.props.currentUser ? null : <Link to="/signup" style={{textDecoration: 'none'}}><button>SIGN UP</button></Link>}
        </div>
        {this.props.currentUser ? <Link to="/products" style={{ textDecoration: 'none', padding: 50 }}><h3 className="logo">SKINN</h3></Link> : <h3 style={{ textDecoration: 'none', padding: 50 }} className="logo">SKINN</h3>}
      </div>
      </React.Fragment>

    )
  }
}

export default NavBar
