import React from 'react';
import firebase from 'firebase';

// declare and define a variable to store the authentication provider
let provider = new firebase.auth.GoogleAuthProvider();
const firebaseFirestore = firebase.firestore();

class Login extends React.Component {
  state = {
    loggedInUser: '',
    loginStyle: '',
    logoutStyle: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user.displayName);
        this.setState({loggedInUser: user.displayName});

        // change the style for login element
        this.setState({loginStyle: "display-none"});
        this.setState({logoutStyle: "display-block content"});
      } else {
        this.setState({loginStyle: "display-block content"});
        this.setState({logoutStyle: "display-none"});
      }
    });
  }

  render() {
    return(
      <div>
        <div id="main-content" className={this.state.logoutStyle}>
          {`Welcome ${this.state.loggedInUser}`}
        </div>

        <div id="login-func" className={this.state.loginStyle}>
          <div className="welcome-prompt">
            <h2>New here? Register..</h2>
            <button className="btn">Register</button>
          </div>
          <div className="welcome-prompt">
            <h2>Already a user?</h2>
            <button id="consumer-login" onClick={this.userLogin} className="btn">Login</button>
          </div>
        </div>

        <div className={this.state.logoutStyle}>
            <button className="btn" onClick={this.userLogout}>Logout</button>
          </div>
      </div>
    );
  }

  userLogin = () => {
    // let the user sign in
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      let userExists = false;
      this.setState({loggedInUser: result.user.displayName});
      if(!(this.isRegistered(result.user, "consumer") || this.isRegistered(result.user, "farmer"))) {
        console.log(`Dear ${result.user.displayName}, please register first.`);
        this.userLogout();
      }
      // The signed-in user info.
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(`Error ${errorCode}: ${errorMessage}. Make sure user is logged in properly!`)
    });
  }

  userLogout = () => {
    firebase.auth().signOut();
  }

  isRegistered = (user, category) => {
    firebaseFirestore.collection(`${category}`).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if(user.email in doc.data()) {
          console.log("user exists");
          return true;
        }
      });
    });
  }
}

export default Login;