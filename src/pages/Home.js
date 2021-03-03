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
    searchQuery: '',
    searchProgress: '',
    isLoading: true
  }

  componentDidMount() {
    document.title = "Home | Krishi Mart";
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.setState({
          loggedInUser: user.displayName,
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
    if(this.state.searchQuery) {
      this.setState({
        searchProgress: (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Let us check the stockroom..</h3>
          </div>
        )
      });
    } else {
      this.setState({
        searchProgress: (
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <h3>Hey there!<br />What are you looking for..?<br />Please let us know via that search bar..</h3>
              <img className="heroImg" src="./images/searchquerynull.svg" alt="Delivery boy here to deliver your order." />
            </div>
            <div className="col-sm-3"></div>
          </div>
        )
      });      
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
              <img className="heroImg" src="./images/farmerlandingpage.svg" alt="Farmer with a hen in his hand, smiling." />
            </div>
          </div>
          <div className={this.state.logoutStyle}>
            <div id="info" className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Search for veggies.." aria-label="Search for veggies.." aria-describedby="button-addon2" onChange={this.onSearchQueryChange} value={this.state.searchQuery} />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.productSearch}>Search</button>
            </div>
            <div id="highlight" className="content container">
              {this.state.searchProgress}
            </div>
            <div id="info">
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
    let resultKey = [];
    firebase.firestore().collection("product").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // collect all the data in a variable
        resultKey = resultKey.concat(doc);
        console.log(resultKey);
      });
      // loop through the results to check for matching results
      let queryData = []; // variable to store the matching results
      for(let snap of resultKey) {
        let snapData = snap.data().crop; // crop in existing database
        if(snapData.includes(this.state.searchQuery)) {
          // if the search keyword is a substring of the crop name in db, add it to the variable
          queryData = this.state.products.concat(snap);
        }
      }
      this.setState({products: queryData});
      // if no results match, null is reflected in this.state.products; in the event of which, user is displayed with the error message 
      if(!(this.state.products.length)) {
        this.setState({
          searchProgress: (
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                <h3>Oops!<br />Seems like we're out of stock with {this.state.searchQuery}..</h3>
                <img className="heroImg" src="./images/searchquerynull.svg" alt="Delivery boy here to deliver your order." />
              </div>
              <div className="col-sm-3"></div>
            </div>
          )
        })
      }
    });
  }

  onSearchQueryChange = (event) => {
    this.setState({searchQuery: event.target.value.toLowerCase()});
  }
}

export default Home;