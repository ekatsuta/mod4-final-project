import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer'
import NavBar from './containers/NavBar'
import QuizPage from './containers/QuizPage'
import BrowseContainer from './containers/BrowseContainer'
import Login from './containers/Login'
import SignUp from './containers/SignUp'

import { Route, Switch } from 'react-router-dom'


const API = "http://localhost:3000"

class App extends React.Component {

  state = {
    allProducts: [], //32 products
    userCollection: [], //10 products for the main container
    skintype: "",
    quiz: false,
    question: "What is your skin type?",
    currentUser: null
  }

  componentDidMount(){
    fetch(`${API}/products`)
    .then(resp => resp.json())
    .then(products => {
      this.setState({
        allProducts: products
      })
      // this.filterProducts()
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
      if (product.skintype === this.state.skintype || product.skintype === 'all') {
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
    fetch(`${API}/user_products/addProducts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.history.push("/home")
    })
  }

  randomizeSelection(productArr){
    const length = productArr.length
    const randomIdx = Math.floor(Math.random() * length)
    return productArr[randomIdx]
  }


  toggleQuiz = () => {
    this.setState({
      quiz: !this.state.quiz
    })
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

  handleSkintype = (event) => {
    this.setState({
      skintype: event.target.innerText.toLowerCase()
    }, () => this.filterProducts())
  }

  loginUser = (input) => {
    fetch(`${API}/login`, {
      headers: {
        "Authorization": input
      }
    })
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        currentUser: response
      }, () => {
        if (response.user_products.length === 0) {
          this.props.history.push("/quiz")
        } else {
          const userProducts = response.user_products.map(userProduct => {
            return userProduct.product
          })
          this.setState({
            userCollection: userProducts
          }, () => this.props.history.push("/home"))
        }
      })

    })
  }

  signUpUser = (input) => {
    fetch(`${API}/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: input
      })
    })
    .then(resp => resp.json())
    .then(newUser => {
      this.setState({
        currentUser: newUser
      }, () => this.props.history.push("/quiz"))
    })
  }

  logout = () => {
    debugger
   this.setState({
     currentUser: null
   }, () => {
     // localStorage.removeItem("token")
    this.props.history.push("/login")
    })
  }

  render(){
    return (
      <React.Fragment>
        <NavBar quiz={this.state.quiz} toggleQuiz={this.toggleQuiz} handleBrowse={this.handleBrowse} handleHome={this.handleHome} logout={this.logout}/>
        <Switch>
          <Route exact path="/login" render={(routerProps) => <Login {...routerProps} loginUser={this.loginUser}/>} />
          <Route exact path="/signup" render={(routerProps) => <SignUp {...routerProps} signUpUser={this.signUpUser}/>} />
          <Route exact path="/home" render={(routerProps) => < MainContainer {...routerProps} products={this.state.userCollection} browse={this.state.showBrowse} currentUser={this.state.currentUser} /> } />
          <Route exact path="/browse" render={(routerProps) => <BrowseContainer {...routerProps} products={this.state.allProducts} browse={this.state.showBrowse} />} />
          <Route exact path="/quiz" render={(routerProps) => <QuizPage {...routerProps}
          handleSkintype={this.handleSkintype}
          question={this.state.question}
          skintype={this.state.skintype}
          products={this.state.userCollection} />}/>
        </Switch>
      </React.Fragment>
    )
  }


}
export default App;
