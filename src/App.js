import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
        <div className="row">
          <div className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand"><img src="./images/logo.png" alt="Krishi Mart logo" width="64" height="64" /></a>
              <form className="d-flex">
                <div className="d-flex align-items-center">  
                  <div id="google_translate_element">
                    <a className="nav-link">Please select a language</a>
                  </div>
                  <div className={this.state.userDisplay}>
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                    
                      <i className="far fa-user"></i>
                      <span> {this.state.userName}</span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" onClick={this.userLogout}>Logout</a></li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <BrowserRouter>
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
