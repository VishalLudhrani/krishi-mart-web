import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    loggedInUser: '',
    loginStyle: '',
    logoutStyle: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.setState({loggedInUser: user.displayName});

        // change the style for login element
        this.setState({loginStyle: "display-none"});
        this.setState({logoutStyle: "display-block content"});
      } else { // user is signed out
        // display the webpage for the user to register/login
        this.setState({loginStyle: "display-block content"});
        this.setState({logoutStyle: "display-none"});
      }
    });
  }

  render() {
    return(
      <div>
        <div className="App">
          <div id="main-content" className={this.state.logoutStyle}>
            {`Welcome ${this.state.loggedInUser}`}
          </div>
          <div className={this.state.loginStyle}>
            <div className="welcome-prompt">
              <h2>New here? Register..</h2>
              <button className="btn"><Link className="btn" to={'/register'}>Register</Link></button>
            </div>
            <div className="welcome-prompt">
              <h2>Already a user?</h2>
              <button id="consumer-login" className="btn"><Link className="btn" to={'/login'}>Login</Link></button>
            </div>
          </div>

          <div className={this.state.logoutStyle}>
            <button className="btn" onClick={this.userLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  userLogout = () => {
    firebase.auth().signOut();
  }
}

export default Home;