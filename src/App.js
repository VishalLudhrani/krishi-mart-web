import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import AddCrop from './pages/AddCrop'

class App extends React.Component {

  state = {
    userName: '',
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
          <strong>  
            <div id="highlight" className="row">
              <div className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <Link to="/home" className="navbar-brand cursor-pointer"><img src="./images/logo.png" alt="Krishi Mart logo" width="64" height="64" /></Link>
                  <button className="navbar-toggler customBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <form className="d-flex">
                      <div className="d-flex align-items-center">  
                        <ul style={{display: 'inline'}, {listStyle: 'none'}} className="navbar-nav align-items-center">
                          <li style={{fontSize: '1.5rem', color: '#49A078', margin: 'auto 20px'}} title="My Cart">
                            <i className="fas fa-shopping-cart cursor-pointer"></i>
                          </li>
                          <li style={{display: 'inline'}}>
                            <div id="google_translate_element">
                              <span className="nav-link cursor-pointer">Please select a language</span>
                            </div>
                          </li>
                          <li style={{display: 'inline'}}>
                            <div className={this.state.userDisplay}>
                              <span className="nav-link dropdown-toggle cursor-pointer" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                    
                                <i className="far fa-user"></i>
                                <span> {this.state.userName}</span>
                              </span>
                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><span className="dropdown-item cursor-pointer"><Link to='/user-profile' style={{textDecoration: "none", color: "#1F2421"}}>My Profile</Link></span></li>
                                <li><span className="dropdown-item cursor-pointer" onClick={this.userLogout}>Logout</span></li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </strong>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/update-profile" exact component={EditUser} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/user-profile" exact component={UserProfile} />
          <Route path="/add-crop" exact component={AddCrop} />
        </BrowserRouter>
      </div>
    );
  }

  userLogout = () => {
    firebase.auth().signOut();
  }
}

export default App;
