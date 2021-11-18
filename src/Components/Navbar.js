import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

class Navbar extends React.Component {

  state = {
    userName: '',
    userDisplay: "display-none",
    userImgUrl: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          userName: user.displayName,
          userImgUrl: user.photoURL,
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
      <div>
        <strong>  
          <div id="highlight" className="row">
            <div className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <button style={{border: '0px'}} className="navbar-toggler customBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-bars" style={{fontSize: '1.5rem'}}></i>
                </button>
                <Link to="/home" className="navbar-brand cursor-pointer"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" width="64" height="64" style={{marginLeft: '24px'}} /></Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <form className="d-flex">
                    <div className="d-flex align-items-center">  
                      <ul style={{display: 'inline'}, {listStyle: 'none'}} className="navbar-nav align-items-center">
                        <li style={{display: 'inline'}}>
                          <div id="google_translate_element">
                            <span className="nav-link cursor-pointer">Please select a language</span>
                          </div>
                        </li>
                        <li style={{display: 'inline'}} className="nav-item">
                          <div className={this.state.userDisplay}>
                            <span className="nav-link dropdown-toggle cursor-pointer" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                    
                              <img src={this.state.userImgUrl} width="32" height="32" style={{borderRadius: '50%'}} alt="User Profile" />
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
                <span style={{fontSize: '1.5rem', color: '#49A078', margin: 'auto 20px'}} title="My Cart">
                  <Link style={{color: '#49A078', textDecoration: 'none'}} to='/cart'><i className="fas fa-shopping-cart cursor-pointer"></i></Link>
                </span>
              </div>
            </div>
          </div>
        </strong>
      </div>
    )
  }

  userLogout = () => {
    firebase.auth().signOut();
  }

}

export default Navbar;