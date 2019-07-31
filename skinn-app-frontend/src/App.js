import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import NavBar from './containers/NavBar'
import QuizPage from './containers/QuizPage'
import BrowseContainer from './containers/BrowseContainer'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import ProductPage from './containers/ProductPage'
import EditProfile from './containers/EditProfile'
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
    allUsers: [],
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
  }

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



  filterProducts(){

    const filteredProducts = this.state.allProducts.filter(product => {
      if (product.skintype === this.state.skintype || product.skintype === 'all') {
        return product
      }
    })

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
    if (userCollection.length > 0) {
      this.setState({
        userCollection: []
      }, () => {
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
      })
    } else {
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
    event.persist();
    this.setState({
      currentUser: {...this.state.currentUser, user_skintype: event.target.innerText.toLowerCase()},
      skintype: event.target.innerText.toLowerCase()
    }, () => {
      this.patchSkintype()
      this.filterProducts()})
  }

  patchSkintype = () => {

    // if (this.state.skintype){
      fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_skintype: this.state.skintype,
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log("patchSkintype", data)})
    // }
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
          currentUser: response,
          loading: false
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

            currentUser: {...response, skintype: this.state.skintype},
            allUsers: [...this.state.allUsers, response]

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

  editProfile = (input) => {
    fetch(`${API}/editprofile`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.currentUser.id,
        name: input.name,
        profile_img: input.profile_img
      })
    })
    .then(resp => resp.json())
    .then(updatedUser => {
      this.setState({
        currentUser: updatedUser
      }, () => this.props.history.push("/products"))
    })
  }


  render(){

    const sortedTenStepProducts = this.state.userCollection.sort(function(a,b){
      return a.category.id - b.category.id
    })

    // if (this.state.loading) {
    //   return (
    //     <React.Fragment>
    //       <NavBar quiz={this.state.quiz} toggleQuiz={this.toggleQuiz} logout={this.logout} currentUser={this.state.currentUser}/>
    //       <div className="loader"></div>
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
          userID={this.state.currentUser}
          products={this.state.userCollection} getCurrentUser={this.getCurrentUser}/>}/>

          <Route exact path="/categories/:id" render={(routerProps)=> {
            const products = this.state.allProducts.filter(product => product.category.id === parseInt(routerProps.match.params.id))
            const category = products[0].category

            return (
              <BrowseContainer {...routerProps} category={category} products={products} handleProductClick={this.handleProductClick} getCurrentUser={this.getCurrentUser}/>
            )
          }}/>

          <Route path="/products/:id" render={(routerProps)=>{

                const foundProduct = this.state.allProducts.find(product => product.id === parseInt(routerProps.match.params.id))

                // if a post is found based on the id in the URL, great!
                if (this.state.currentProduct){
                  return (

                    <ProductPage skintype={this.state.skintype}
                    users={this.state.allUsers} pathName="products" userID={this.state.currentUser} productID={this.state.currentProduct.id} product={foundProduct} getCurrentUser={this.getCurrentUser}/>


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

                    <ProductPage  skintype={this.state.skintype} users={this.state.allUsers} product={foundProduct} userID={this.state.currentUser} productID={this.state.currentProduct.id} pathName="browse" swapItem={this.swapItem} getCurrentUser={this.getCurrentUser}/>

                  )
                } else {
                  // if a post is not found, then render a Redirect
                  return null
                }

              }}/>


          <Route exact path="/edit" render={(routerProps) => <EditProfile {...routerProps} user={this.state.currentUser} editProfile={this.editProfile}/>} />


        </Switch>
      </React.Fragment>
    )
  }


}
export default App;
