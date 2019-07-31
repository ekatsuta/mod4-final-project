import React from 'react'
import StepCard from '../components/StepCard'
import default_profile from '../components/default_profile.jpg'
import { Link } from 'react-router-dom'

class MainContainer extends React.Component {

  // componentDidMount(){
  //   this.props.getCurrentUser()
  // }

  render(){
    return(
      <div className="main-container">
        <div className="main-container-title">
          <div className="name-and-title">
          <h3 className="hi-user">Hi {this.props.currentUser.name}!</h3>
          <h3 className="your-10-step-skincare">Your 10 Step Skincare</h3>
          </div>
          <div className="user-image-container">
            <Link to="/edit">{this.props.currentUser.profile_img ? <img src={this.props.currentUser.profile_img} />: <img src="https://www.freeiconspng.com/uploads/profile-icon-28.png"/>}</Link>
          </div>
        </div>
        {this.props.products.map((product, idx) => {
          return <StepCard key={product.id} category={product.category} product={product.product} idx={idx} handleProductClick={this.props.handleProductClick} browse={this.props.browse} pathName="products"/>
        })}
      </div>
    )
  }
}

export default MainContainer
