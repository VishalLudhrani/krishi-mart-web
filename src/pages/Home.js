import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const vader = require('vader-sentiment');
const mql = window.matchMedia("screen and (max-width: 576px)");

class Home extends React.Component {
  state = {
    loggedInUser: '',
    loggedInUserCategory: '',
    loginStyle: '',
    logoutStyle: '',
    products: [],
    searchQuery: '',
    searchProgress: '',
    isLoading: true,
    heroContentStyle: 'col-sm-6',
    cropsContent: (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3>Checking your warehouse..</h3>
      </div>
    )
  }

  componentDidMount() {
    document.title = "Home | Krishi Mart";
    this.formStyle(mql)
    mql.addEventListener('change', this.formStyle);

    // check the user, and set the content to be rendered accordingly
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
        // check if the user is farmer, and set the screen content accordingly
        firebase.database().ref('user/').on('value', (snapshot) => {
          let userdb = [];
          snapshot.forEach((doc) => {
            userdb = userdb.concat(doc.val());
          })
          // check for user category, so that home page is rendered accordingly
          for(let u of userdb) {
            if(u.category === 'farmer' && u.email === user.email) {
              this.setState({
                loggedInUserCategory: 'farmer'
              });
              // logged in user is farmer
              let cropdb = [];
              let userEmail = '';
              let userCrops = [];
              // get the crops that belong to logged in farmer
              firebase.database().ref('product').on('value', (snapshot) => {
                snapshot.forEach((doc) => {
                  cropdb = cropdb.concat(doc);
                });
                firebase.auth().onAuthStateChanged((user) => {
                  if(user) {
                    userEmail = user.email;
                    for(let crop of cropdb) {
                      if(userEmail === crop.val().farmerEmail) {
                        userCrops = userCrops.concat(crop);
                      }
                    }
                  }
                  if(userCrops.length) {
                    this.setState({
                      cropsContent: (
                        <div id="info">
                          <h2>Your Crops:</h2>
                          {
                            userCrops.map((product, pos) => {
                              return(
                                <ProductItem product={product} key={pos} />
                              )
                            })
                          }
                        </div>
                      )
                    })
                  } else {
                    this.setState({
                      cropsContent: (
                        <div className="row">
                          <div className="col-sm-3"></div>
                          <div className="col-sm-6">
                            <h3>Welcome back to Krishi Mart!<br />Your products appear here!</h3>
                            <img style={{width: '75%', height: 'auto'}} src="./images/farmer-crop-upload.svg" alt="Delivery boy here to deliver your order." />
                          </div>
                          <div className="col-sm-3"></div>
                        </div>
                      )
                    }); 
                  }
                });
              });
              break;
            }
            if(u.category === 'consumer' && u.email === user.email) {
              this.setState({
                loggedInUserCategory: 'consumer'
              });
              // logged in user is a consumer
              if(this.state.searchQuery) {
                // loading state
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
                // idle state
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
              break;
            }
          }
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
  }

  componentWillUnmount() {
    firebase.database().ref('product').off();
    firebase.database().ref('product').off();
    firebase.database().ref('product/').off();
    firebase.database().ref('user/').off();
    firebase.database().ref('user').off();
    mql.removeEventListener('change', this.formStyle);
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
      if(this.state.loggedInUserCategory === 'consumer') {
        displayContent = (
          <div>
            <div className={this.state.loginStyle}>
              <div className={this.state.heroContentStyle}>
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
                <input type="text" className="form-control" placeholder="Search for groceries.." aria-label="Search for veggies.." aria-describedby="button-addon2" onChange={this.onSearchQueryChange} value={this.state.searchQuery} />
                <button className="btn btn-outline-success" type="button" id="button-addon2" onClick={this.productSearch}>Search</button>
              </div>
              <div id="info">
                <h3 id="highlight">Results for '{this.state.searchQuery}'</h3>
                <br />
                <div id="highlight" className="content container">
                  {this.state.searchProgress}
                </div>
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
      } else {
        displayContent = (
          <div>
            <div className={this.state.loginStyle}>
              <div className={this.state.heroContentStyle}>
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
              <button className="btn btn-outline-success" type="button" style={{width: '75%', margin: '10px auto'}}><Link to="/add-crop" style={{textDecoration: 'none', color: '#49A078'}}>Add Crop</Link></button>
              <br />
              <div id="highlight" className="container">
                {this.state.cropsContent}
              </div>
            </div>
          </div>
        )
      }
    }
    return displayContent;
  }

  formStyle = (e) => {
    if(e.matches){
      this.setState({
        heroContentStyle: 'col-sm-6 content'
      });
      console.log();
    }
    else{
      this.setState({
        heroContentStyle: 'col-sm-6'
      })
    }
  }

  productSearch = () => {
    let resultKey = [];
    let previousProductsData = '';
    while(this.state.products.length) {
      previousProductsData = this.state.products.pop();
    }
    if(this.state.searchQuery) {
      firebase.database().ref('product/').on('value', (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // collect all the data in a variable
          if(!(doc.val().quantity_kg < 15 && doc.val().buyerEmail)) {
            resultKey = resultKey.concat(doc);
            // 1. identify the farmer
            let farmer = doc.val().farmerEmail;
            // 2. collect reviews from their corresponding products
            let reviewRaw;
            let reviewPos;
            let farmerObj;
            let breakFlag = true;
            firebase.database().ref('product').on('value', (snapshot) => {
              snapshot.forEach((s) => {
                if(farmer === s.val().farmerEmail) {
                  if(s.val().review) {
                    reviewRaw += s.val().review;
                  }
                }
              })
              // 3. calculate the positivity, and store it in farmer's object in the db
              if(reviewRaw) {
                console.log(reviewRaw);
                reviewPos = vader.SentimentIntensityAnalyzer.polarity_scores(reviewRaw);
                console.log(reviewPos);
                reviewPos = reviewPos.pos * 100;
                firebase.database().ref('user/').on('value', (userSnapshot) => {
                  userSnapshot.forEach((user) => {
                    if(breakFlag && farmer === user.val().email) {
                      farmerObj = user.val();
                      breakFlag = false;
                    }
                  })
                  if(reviewPos) {
                    firebase.database().ref('user/' + farmerObj.phNo).update({
                      percentPositiveReview: reviewPos
                    })
                    console.log('success pushing the updated review percentage');
                  }
                })
              }
            })
          }
        });
        // loop through the results to check for matching results
        let queryData = []; // variable to store the matching results
        for(let snap of resultKey) {
          if(snap) {
            let snapData = snap.val().crop.toLowerCase(); // crop in existing database
            if(snapData.includes(this.state.searchQuery)) {
              // if the search keyword is a substring of the crop name in db, add it to the variable
              queryData = queryData.concat(snap);
            }
          }
        }
        this.setState({products: queryData});
        // if no results match, null is reflected in this.state.products; in the event of which, user is displayed with the error message 
        if(queryData.length) {
          this.setState({searchProgress: ''});
        } else {
          this.setState({
            searchProgress: (
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                  <h3>Oops!<br />Seems like we're out of stock with {this.state.searchQuery}..🥺</h3>
                  <img className="heroImg" src="./images/farmercropsnotfound.svg" alt="Delivery boy here to deliver your order." />
                </div>
                <div className="col-sm-3"></div>
              </div>
            )
          })
        }
      });
      // rotate the spinner until search results appear
      if(!(this.state.products.length) && !(this.state.searchQuery)) {
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
      }
    } else {
      this.setState({
        searchProgress: (
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <h4>Please provide an input..<br />Check your groceries, and see what's missing..<br />We're here to help!😇</h4>
              <img className="heroImg" src="./images/farmercropsnotfound.svg" alt="Delivery boy here to deliver your order." />
            </div>
            <div className="col-sm-3"></div>
          </div>
        )
      })
    }
  }

  onSearchQueryChange = (event) => {
    this.setState({searchQuery: event.target.value.toLowerCase()});
  }
}

export default Home;