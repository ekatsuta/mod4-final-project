import React from 'react'
import StepCard from '../components/StepCard'

class MainContainer extends React.Component {

  render(){
    console.log("main", this.props)
    return(
      <div className="main-container">
        <h3>Your 10 Step Skincare</h3>
        {this.props.products.map((product, idx) => {
          return <StepCard key={product.id} product={product} idx={idx} browse={this.props.browse}/>
        })}
      </div>
    )
  }
}

export default MainContainer
