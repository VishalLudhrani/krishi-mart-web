import React from 'react';
import firebase from 'firebase';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  state = {
    userEmail: '',
    userPassword: '',
    btnStyle: '',
    loggedInUser: '',
    heroContentStyle: 'col-sm-6 loginFormHero',
    headerStyle: '',
    loginStatus: '',
    loginStatusStyle: ''
  }

  componentDidMount() {
    document.title = "Login | Krishi Mart";
    var mql = window.matchMedia("screen and (max-width: 576px)");
    this.formStyle(mql)
    mql.addEventListener('change', this.formStyle);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedInUser: user.email});
      }
    });
  }

  render() {
    return(
      <div className="row heroSection">
        <div className={this.state.heroContentStyle}>
          <div id="highlight" className={this.state.headerStyle}>
            <h2>Hi there, Welcome Back!</h2>
            <h3>Login to continue.</h3>
          </div>
          <br />
          <div id="highlight" className={this.state.loginStatusStyle}>
            {this.state.loginStatus}
          </div>
          <form onSubmit={this.handleSubmit} id="info">
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
            <input type="Submit" className="customBtn" onClick={this.userLogin} value="Login" />
          </form>
        </div>
        <div className="col-sm-6">
          <img className="heroImg" src="./images/farmerloginpage.svg" />
        </div>
      </div>
    );
  }

  formStyle = (e) => {
    if(e.matches){
      this.setState({
        heroContentStyle: 'col-sm-6 loginFormHero content'
      });
      console.log();
    }
    else{
      this.setState({
        heroContentStyle: 'col-sm-6 loginFormHero'
      })
    }
  }

  userLogin = () => {
    // let the user sign in
    let email = this.state.userEmail;
    let password = this.state.userPassword;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in 
        this.setState({
          loginStatus: 'Logged in successfully!',
          loginStatusStyle: 'alert alert-success'
        });
        this.props.history.push('/home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          loginStatus: (
            <p>
              <strong>Error: {errorCode}</strong>
              <br />
              {errorMessage}
            </p>
            ),
          loginStatusStyle: 'alert alert-danger'
        });
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

export default withRouter(Login);