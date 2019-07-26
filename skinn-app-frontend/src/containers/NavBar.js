import React from 'react'


class NavBar extends React.Component {

  render(){
    console.log("quiz click", this.props.quiz)
    return(
      <div className="navbar">
        <h3 onClick={this.props.handleHome} className="logo">SKINN</h3>
        <div className="nav-buttons">

          <button onClick={this.props.toggleQuiz}>QUIZ PAGE</button>
          <button onClick={this.props.handleBrowse}>BROWSE</button>

          <button>LOG IN</button>

        </div>
      </div>
    )
  }
}

export default NavBar
