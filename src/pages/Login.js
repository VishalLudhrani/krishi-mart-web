import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
  state = {
    userEmail: '',
    userPassword: ''
  }

  componentDidMount() {
    document.title = "Login | Krishi Mart";
  }

  render() {
    return(
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <label>Enter your email:
            <br />
            <input className="input" type="email" placeholder="jondoe@sample.com" value={this.state.userEmail} onChange={this.onEmailChange} />
          </label>
          <br />
          <br />
          <label>Enter your password:
            <br />
            <input className="input" type="password" onChange={this.onPasswordChange} />
          </label>
          <br />
          <br />
          <input type="Submit" className="btn" onClick={this.userLogin} />
        </form>
      </div>
    );
  }

  userLogin = () => {
    // let the user sign in
    let email = this.state.userEmail;
    let password = this.state.userPassword;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in 
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error: ${errorCode} \n${errorMessage}`);
      });
  }

  onEmailChange = (event) => {
    this.setState({userEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({userPassword: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

}

export default Login;