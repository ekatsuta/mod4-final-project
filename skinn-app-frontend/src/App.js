import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer'
import NavBar from './containers/NavBar'


class App extends React.Component {

  state = {
    allProducts: [], //32 products
    userCollection: [], //10 products for the main container
    skintype: "all",
  }

  componentDidMount(){
    fetch("http://localhost:3000/products")
    .then(resp => resp.json())
    .then(products => {
      this.setState({
        allProducts: products
      })
      this.filterProducts()
    })

  }

  filterProducts(){
    //for each category, select matching products, then select matching skintype;
    //if more than one result, randomize and choose 1
    //save the results in user_collection array
    const categories = this.state.allProducts.map(product => {
      return product.category.name
    })
    const uniqueCategories = [...new Set(categories)]

    const filteredProducts = this.state.allProducts.filter(product => {
      if (product.skintype === this.state.skintype) {
        return product
      }
    })
    //first organize the filteredProducts according to the category, and save in a variable
    // [[oil cleanser1, oil cleanser2],[serum1],[oil1, oil2, oil3],[]....]

    // then iterate over this new organized array. And IF the element's length is more than 1,
    // that means we have to randomize to get 1 product per category.

    const organizedProducts = {}

    for (let i = 0; i < filteredProducts.length; i++) {
      if (filteredProducts[i].category.name in organizedProducts) {
        organizedProducts[filteredProducts[i].category.name].push(filteredProducts[i])
      } else {
        organizedProducts[filteredProducts[i].category.name] = [filteredProducts[i]]
      }
    }

    const finalArr = []

    for (let category in organizedProducts) {
      if (organizedProducts[category].length > 1) {
        finalArr.push(this.randomizeSelection(organizedProducts[category]))
      } else {
        finalArr.push(organizedProducts[category])
      }
    }

    this.setState({
      userCollection: finalArr.flat()
    })

    // const listOfCategories = filteredProducts.map(product => {
    //   return product.category.name
    // })
    //
    // const count = {}
    // listOfCategories.forEach(function(category) {count[category] = (count[category] || 0) + 1})
    //
    // const finalProductArr = [] //want to push the product object per category into this array, and eventually set the state to this array
    // const categoriesToBeRandomized = []
    //
    // for (let category in count) {
    //   if (count[category] > 1) {
    //     categoriesToBeRandomized.push(category)
    //   }
    // }


  }


  randomizeSelection(productArr){
    const length = productArr.length
    const randomIdx = Math.floor(Math.random() * length)
    return productArr[randomIdx]
  }



  render(){

    return (
      <div>
        <NavBar />
        <MainContainer products={this.state.userCollection}/>
      </div>
    )

  }
}
export default App;
