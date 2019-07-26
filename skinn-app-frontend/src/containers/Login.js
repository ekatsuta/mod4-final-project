import React from 'react'

class Login extends React.Component {

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
    //callback function here.
    this.props.loginUser(this.state.username)
  }

  render(){
    return (
      <div className="login-container">
        <h3>LOGIN</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }

}

export default Login
