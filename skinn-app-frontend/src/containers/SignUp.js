import React from 'react'

class SignUp extends React.Component {

  state = {
    name: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  handleInput = (event) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.signUpUser(this.state)
    this.setState({
      name: "",
      username: "",
      password: "",
      passwordConfirmation: ""
    })
  }

  render(){
    return (
      <div className="login-container">
        <div className="login-subcontainer">
        <h3>SIGN UP</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" name="name" value={this.state.name} placeholder="Name"/>
          <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
          <input onChange={this.handleInput} type="password" name="password" value={this.state.password} placeholder="Password"/>
          <input onChange={this.handleInput} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder="Password Confirmation"/>
          <input type="submit" value="SIGN UP" />
        </form>
        </div>
      </div>
    )
  }

}

export default SignUp
