import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import EditUser from './pages/EditUser';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {

  state = {
    userName: null,
    userDisplay: "display-none"
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          userName: user.displayName,
          userDisplay: "display-block dropdown"
        })
      } else {
        this.setState({
          userDisplay: "display-none"
        });
      }
    });
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div className="row">
            <div className="navbar">
              <div className="container-fluid">
                <Link to="/home" className="navbar-brand cursor-pointer"><img src="./images/logo.png" alt="Krishi Mart logo" width="64" height="64" /></Link>
                <form className="d-flex">
                  <div className="d-flex align-items-center">  
                    <div id="google_translate_element">
                      <span className="nav-link cursor-pointer">Please select a language</span>
                    </div>
                    <div className={this.state.userDisplay}>
                      <span className="nav-link dropdown-toggle cursor-pointer" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                    
                        <i className="far fa-user"></i>
                        <span> {this.state.userName}</span>
                      </span>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><span className="dropdown-item cursor-pointer" onClick={this.userLogout}>Logout</span></li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/update-profile" exact component={EditUser} />
          <Route path="/product/:id" exact component={ProductDetails} />
        </BrowserRouter>
      </div>
    );
  }

  userLogout = () => {
    firebase.auth().signOut();
  }
}

export default App;
