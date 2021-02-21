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
    filterValue: 4
  }

  componentDidMount() {
    document.title = "Home | Krishi Mart";
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.setState({loggedInUser: user.displayName});
        // change the style for login element
        this.setState({loginStyle: "display-none"});
        this.setState({logoutStyle: "display-block"});
      } else { // user is signed out
        // display the webpage for the user to register/login
        this.setState({loginStyle: "display-block row heroSection"});
        this.setState({logoutStyle: "display-none"});
      }
    });
  }

  render() {
    return(
      <div>
        <div className={this.state.loginStyle}>
          <div className="col-lg-6">
            <h3 id="highlight" className="heroTitle">Khet Se Ghar Tak</h3>
            <div id="info">
              <p className="heroText">Providing you fresh, and organic vegetables.. Straight from the farm!</p>
              <button className="customBtn"><Link className="customBtn" to="/login">Login</Link></button>
              <br />
              <br />
              <button className="customBtnSecondary"><Link className="customBtnSecondaryx" to="/register">Register</Link></button>
            </div>
          </div>
          <div className="col-lg-6">
            <img className="heroImg" src="./images/farmerlandingpage.svg" />
          </div>
        </div>
      </div>
    );
  }

  productSearch = () => {
    firebase.firestore().collection("product").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let queryData = this.state.products.concat(doc);
        this.setState({products: queryData});
      });
    });
  }
}

export default Home;