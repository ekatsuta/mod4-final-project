import React from 'react'

export default class EditProfile extends React.Component {

  state = {
    name: this.props.user.name,
    profile_img: this.props.user.profile_img
  }

  handleChange = (event) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit = (event) => {
    event.preventDefault()
    this.props.editProfile(this.state)
  }


  render(){
    return (
      <div className="edit-profile-container">
        <form onSubmit={this.handleEdit} className="edit-profile-form">
        <h1>Edit Profile</h1>
        <h3>Name:</h3>
        <input type="text" onChange={this.handleChange} name="name" value={this.state.name}/>
        <h3>Profile Image:</h3>
        <input type="text" onChange={this.handleChange} name="profile_img" value={this.state.profile_img} placeholder="Image URL"/>
        <input type="submit" value="SAVE"/>
        </form>
      </div>
    )
  }

}
