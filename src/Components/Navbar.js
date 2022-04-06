import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import useUser from "../hooks/useUser";

const Navbar = () => {

  const { user } = useUser();
  
  const userLogout = () => {
    firebase.auth().signOut();
  }

  return(
    <nav id="highlight" className="row">
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button style={{border: '0px'}} className="navbar-toggler customBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars" style={{fontSize: '1.5rem'}}></i>
          </button>
          <Link to="/home" className="navbar-brand cursor-pointer"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" width="64" height="64" style={{marginLeft: '24px'}} /></Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <div id="google_translate_element">
                  <span className="nav-link cursor-pointer">Please select a language</span>
                </div>
              </li>
              <li className="nav-item">
                <div className={user ? "display-block dropdown" : "display-none"}>
                  <span className="nav-link dropdown-toggle cursor-pointer" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                    
                    <img src={user ? user.photoURL : "https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-128.png"} width="32" height="32" style={{borderRadius: '50%'}} alt="User Profile" />
                    <span> {user ? user.displayName : "User"}</span>
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><span className="dropdown-item cursor-pointer"><Link to='/user-profile' style={{textDecoration: "none", color: "#1F2421"}}>My Profile</Link></span></li>
                    <li><span className="dropdown-item cursor-pointer" onClick={userLogout}>Logout</span></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <span style={{fontSize: '1.5rem', color: '#49A078', margin: 'auto 20px'}} title="My Cart">
            <Link style={{color: '#49A078', textDecoration: 'none'}} to='/cart'><i className="fas fa-shopping-cart cursor-pointer"></i></Link>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;