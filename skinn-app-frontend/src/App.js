import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import NavBar from './containers/NavBar'
import QuizPage from './containers/QuizPage'
import BrowseContainer from './containers/BrowseContainer'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import ProductPage from './containers/ProductPage'
import { Route, Switch } from 'react-router-dom'

// Endpoint
const API = "http://localhost:3000"

class App extends React.Component {

  state = {
    allProducts: [],
    userCollection: [],
    skintype: "",
    quiz: false,
    question: "What is your skin type?",
    currentUser: null,
    currentProduct: null,
    allUsers: []
  }

  handleProductClick = (propsId) => {

    let selectedProduct = this.state.allProducts.find(product => {
      return product.id === propsId
    })
    this.setState({
      currentProduct: selectedProduct
    })
  }

  componentDidMount(){
    fetch(`${API}/products`)
    .then(resp => resp.json())
    .then(products => {
      this.setState({
        allProducts: products
      }, () => this.fetchUsers())

    })

    // const user_id = localStorage.user_id
    // if (user_id){
    //   fetch(`${API}/auto_login`, {
    //     headers: {
    //       "Authorization": user_id
    //     }
    //   })
    //   .then(resp => resp.json())
    //   .then(response => {
    //     if (response.errors){
    //       alert(response.errors)
    //     } else {
    //       this.setState({
    //         currentUser: response.user,
    //         userCollection: response.userCollection,
    //         loading: false
    //       })
    //     }
    //   })
    // } else {
    //   this.props.history.push('/login')
    //   this.setState({
    //     loading: false
    //   })
    // }
  }


  filterProducts(){
    //for each category, select matching products, then select matching skintype;
    //if more than one result, randomize and choose 1
    //save the results in user_collection array

    // const categories = this.state.allProducts.map(product => {
    //   return product.category.name
    // })
    // const uniqueCategories = [...new Set(categories)]

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

    this.createUserProduct(finalArr.flat())

  }

  createUserProduct(userCollection){
    //need to first fetch (componentDidMount? or Update? THEN set the state)
    fetch(`${API}/user_products/addProducts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        userCollection: userCollection,
        currentUser: this.state.currentUser
      })
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        userCollection: json
      }, () => this.props.history.push("/products"))
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

  handleSkintype = (event) => {
    this.setState({
      skintype: event.target.innerText.toLowerCase()
    }, () => this.filterProducts())
  }

  loginUser = (input) => {
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: input.username,
        password: input.password
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        this.setState({
          currentUser: response
        }, () => {
          if (response.user_products.length === 0) {
            localStorage.user_id = response.id
            this.props.history.push("/quiz")
          } else {
            const userProducts = response.user_products
            this.setState({
              userCollection: userProducts
            }, () => {
              localStorage.user_id = response.id
              this.props.history.push("/products")
            })
          }
        })
      }
    })
  }

  signUpUser = (input) => {
    if (input.password === input.passwordConfirmation) {
      fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          username: input.username,
          password: input.password
        })
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors){
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          }, () => {
            localStorage.user_id = response.id
            this.props.history.push("/quiz")}
          )
        }

      })
    } else {
      alert("Passwords don't match!")
    }

  }

  logout = () => {
   this.setState({
     currentUser: null
   })
   localStorage.removeItem("user_id")
   this.props.history.push("/login")
  }

  swapItem = (newProduct) => {

    fetch(`${API}/user_products/swap`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.currentUser.id,
        product_id: newProduct.id,
        category_id: newProduct.category.id
      })
    })
    .then(resp => resp.json())
    .then(updatedProduct => {
      const newCollection = this.state.userCollection.map(product => {
        if (product.category.id === newProduct.category.id) {
          return updatedProduct
        } else {
          return product
        }
      })
      this.setState({
        userCollection: newCollection
      }, () => this.props.history.push("/products"))

    })
  }

  fetchUsers = () => {
    fetch('http://localhost:3000/users')
      .then(r => r.json())
      .then(data => {
        this.setState({
          allUsers: data
        })

      })
  }


  render(){
    console.log("app", this.state.allUsers)

    const sortedTenStepProducts = this.state.userCollection.sort(function(a,b){
      return a.category.id - b.category.id
    })

    // if (this.state.loading) {
    //   return (
    //     <React.Fragment>
    //       <NavBar quiz={this.state.quiz} toggleQuiz={this.toggleQuiz} logout={this.logout} currentUser={this.state.currentUser}/>
    //       Loading...
    //     </React.Fragment>
    //   )
    // }
    return (
      <React.Fragment>

        <NavBar quiz={this.state.quiz} toggleQuiz={this.toggleQuiz} logout={this.logout} currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/login" render={(routerProps) => <Login {...routerProps} loginUser={this.loginUser}/>} />

          <Route exact path="/signup" render={(routerProps) => <SignUp {...routerProps} signUpUser={this.signUpUser}/>} />

          <Route exact path="/products" render={(routerProps) => < MainContainer {...routerProps} products={sortedTenStepProducts} currentUser={this.state.currentUser} handleProductClick={this.handleProductClick} getCurrentUser={this.getCurrentUser}/> } />

          <Route exact path="/browse" render={(routerProps) => <BrowseContainer {...routerProps} products={this.state.allProducts} handleProductClick={this.handleProductClick} getCurrentUser={this.getCurrentUser}/>} />

          <Route exact path="/quiz" render={(routerProps) => <QuizPage {...routerProps}
          handleSkintype={this.handleSkintype}
          question={this.state.question}
          skintype={this.state.skintype}
          products={this.state.userCollection} getCurrentUser={this.getCurrentUser}/>}/>

          <Route exact path="/categories/:id" render={(routerProps)=> {
            const products = this.state.allProducts.filter(product => product.category.id === parseInt(routerProps.match.params.id))

            return (
              <BrowseContainer {...routerProps} products={products} handleProductClick={this.handleProductClick} getCurrentUser={this.getCurrentUser}/>
            )
          }}/>

          <Route path="/products/:id" render={(routerProps)=>{

                const foundProduct = this.state.allProducts.find(product => product.id === parseInt(routerProps.match.params.id))

                // if a post is found based on the id in the URL, great!
                if (this.state.currentProduct){
                  return (

                    <ProductPage users={this.state.allUsers} pathName="products" userID={this.state.currentUser} productID={this.state.currentProduct.id} product={foundProduct} getCurrentUser={this.getCurrentUser}/>


                  )
                } else {
                  // if a post is not found, then render a Redirect
                  return null
                }

              }}/>

              <Route path="/browse/:id" render={(routerProps)=>{

                    const foundProduct = this.state.allProducts.find(product => product.id === parseInt(routerProps.match.params.id))

                    // if a post is found based on the id in the URL, great!
                    if (this.state.currentProduct){
                      return (

                        <ProductPage users={this.state.allUsers} product={foundProduct} userID={this.state.currentUser} productID={this.state.currentProduct.id} pathName="browse" swapItem={this.swapItem} getCurrentUser={this.getCurrentUser}/>

                      )
                    } else {
                      // if a post is not found, then render a Redirect
                      return null
                    }

                  }}/>

        </Switch>
      </React.Fragment>
    )
  }


}
export default App;
