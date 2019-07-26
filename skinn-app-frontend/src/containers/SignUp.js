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
    //callback function here.
  }

  render(){
    return (
      <div className="login-container">
        <h3>SIGN UP</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }

}

export default SignUp
