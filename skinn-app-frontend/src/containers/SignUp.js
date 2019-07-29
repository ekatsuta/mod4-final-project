import React from 'react'

class SignUp extends React.Component {

  state = {
    username: ""
  }

  handleInput = (event) => {
    event.persist()
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    debugger
    this.props.signUpUser(this.state.username)
  }

  render(){
    return (
      <div className="login-container">
        <div className="login-subcontainer">
        <h3>SIGN UP</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
          <input type="submit" value="SUBMIT" />
        </form>
        </div>
      </div>
    )
  }

}

export default SignUp
