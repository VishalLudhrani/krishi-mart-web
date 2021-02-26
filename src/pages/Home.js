import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

class Home extends React.Component {
  state = {
    loggedInUser: '',
    loginStyle: '',
    logoutStyle: '',
    products: [],
    filterCriteria: "rating",
    filterValue: 4,
    queryNull: 'display-block row',
    searchQuery: null,
    nullMessage: null,
    isLoading: true
  }

  componentDidMount() {
    document.title = "Home | Krishi Mart";
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.setState({loggedInUser: user.displayName,
        // change the style for login element,
        loginStyle: "display-none",
        logoutStyle: "display-block row",
        isLoading: false
      });
      } else { // user is signed out
        // display the webpage for the user to register/login
        this.setState({
          loginStyle: "display-block row heroSection",
          logoutStyle: "display-none",
          isLoading: false
        });
      }
    });
    if(this.state.products.length === 0) {
      this.setState({queryNull: 'display-block row'});
    } else {
      this.setState({queryNull: 'display-none'});
    }
    if(!(this.state.searchQuery)) {
      this.setState({nullMessage: 'Oops!<br />Nothing found..'});
    }
  }

  render() {
    let displayContent = null;
    if(this.state.isLoading) {
      displayContent = (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3>Please wait while the mart opens up for you!</h3>
        </div>
      )
    } else {
      displayContent = (
        <div>
          <div className={this.state.loginStyle}>
            <div className="col-sm-6">
              <h3 id="highlight" className="heroTitle">Khet Se Ghar Tak</h3>
              <div id="info">
                <p className="heroText">Providing you fresh, and organic vegetables.. Straight from the farm!</p>
                <button className="customBtn"><Link className="customBtn" to="/login">Login</Link></button>
                <br />
                <br />
                <button className="customBtnSecondary"><Link className="customBtnSecondaryx" to="/register">Register</Link></button>
              </div>
            </div>
            <div className="col-sm-6">
              <img className="heroImg" src="./images/farmerlandingpage.svg" />
            </div>
          </div>
          <div className={this.state.logoutStyle}>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search for veggies.." aria-label="Search for veggies.." aria-describedby="button-addon2" onChange={this.onSearchQueryChange} value={this.state.searchQuery} />
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.productSearch}>Search</button>
            </div>
            <div className={this.state.queryNull}>
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h4 className="content">Oops!<br />No results found..</h4>
                <img className="heroImg" src="./images/searchquerynull.svg" />
              </div>
              <div className="col-md-3"></div>
            </div>
            <div>
              {
                this.state.products.map((product, pos) => {
                  return(
                    <ProductItem product={product} key={pos} />
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
    return displayContent;
  }

  productSearch = () => {
    firebase.firestore().collection("product").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let queryData = this.state.products.concat(doc);
        this.setState({products: queryData});
      });
    });
    if(this.state.products.length === 0) {
      this.setState({queryNull: 'display-none'});
    } else {
      this.setState({queryNull: 'display-block row'});
    }
  }

  onSearchQueryChange = (event) => {
    this.setState({searchQuery: event.target.value});
  }
}

export default Home;