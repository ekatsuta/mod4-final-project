import React from 'react'
import StepCard from '../components/StepCard'

class MainContainer extends React.Component {


  render(){
    return(
      <div className="main-container">
        {this.props.products.map(product => {
          return <StepCard key={product.id} product={product}/>
        })}
      </div>
    )
  }
}

export default MainContainer
