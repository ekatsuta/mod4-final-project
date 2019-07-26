import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer'
import NavBar from './containers/NavBar'
import BrowseContainer from './containers/BrowseContainer'


const API = "http://localhost:3000/"

class App extends React.Component {

  state = {
    allProducts: [], //32 products
    userCollection: [], //10 products for the main container
    skintype: "all",
    showBrowse: false,
    currentUser: null
  }

  componentDidMount(){
    fetch(`${API}/products`)
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
    }, () => this.createUserProduct())


  }

  createUserProduct(){
    //need to first fetch (componentDidMount? or Update? THEN set the state)
    fetch(`${API}/user_products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
  }

  randomizeSelection(productArr){
    const length = productArr.length
    const randomIdx = Math.floor(Math.random() * length)
    return productArr[randomIdx]
  }

  handleBrowse = () => {
    this.setState({
      showBrowse: true
    })
  }

  handleHome = () => {
    this.setState({
      showBrowse: false
    })
  }


  render(){

    return (
      <div>
        <NavBar handleBrowse={this.handleBrowse} handleHome={this.handleHome}/>
        {this.state.showBrowse ? <BrowseContainer products={this.state.allProducts} browse={this.state.showBrowse}/> : <MainContainer products={this.state.userCollection} browse={this.state.showBrowse}/>}
      </div>
    )

  }
}
export default App;
