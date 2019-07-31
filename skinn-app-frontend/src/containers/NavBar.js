import React from 'react'
import { Link } from 'react-router-dom'


class NavBar extends React.Component {

  renderUserController(){
    return (
      <React.Fragment>
        <div className="dropdown">
        <Link to="/browse" style={{ textDecoration: 'none' }} className="dropbtn"><button>BROWSE</button></Link>
          <div class="dropdown-content">
            <Link to="/categories/1">Oil Cleansers</Link>
            <Link to="/categories/2">Water Base Cleansers</Link>
            <Link to="/categories/3">Exfoliator</Link>
            <Link to="/categories/4">Toner</Link>
            <Link to="/categories/5">Serum</Link>
            <Link to="/categories/6">Mask</Link>
            <Link to="/categories/7">Eyecream</Link>
            <Link to="/categories/8">Moisturizer</Link>
            <Link to="/categories/9">Sunscreen</Link>
            <Link to="/categories/10">Facial Oil</Link>
          </div>
        </div>
      <Link to="/quiz" style={{ textDecoration: 'none' }}><button>RETAKE QUIZ</button></Link>
      </React.Fragment>
    )
  }

  // renderProfileController(){
  //   return (
  //     <div className="profile-image-container">
  //       <div className = "dropdown">
  //       <p>👤 {this.props.currentUser.username}</p>
  //         <div className="dropdown-content">
  //           <button onClick={this.props.logout}>LOG OUT</button>
  //           <Link to="/quiz">RETAKE QUIZ</Link>
  //           <p>EDIT PROFILE</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

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
