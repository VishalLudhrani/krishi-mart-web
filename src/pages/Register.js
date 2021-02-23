import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  state = {
    email: '',
    pwd: '',
    pwdVerify: '',
    regStatus: '',
    regStatusStyle: ''
  }

  componentDidMount() {
    document.title = "Register | Krishi Mart";
  }

  render() {
    return(
     <div className="row heroSection">
        <div className="col-sm-6 registerFormHero">
          <h3 className={this.state.regStatusStyle}>{this.regStatus}</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Enter your e-mail: <br />
              <input type="email" placeholder="jondoe@example.com" onChange={this.onEmailChange} />
            </label>
            <br />
            <br />
            <label>Enter your password:<br />
              <input type="password" onChange={this.onPwdChange} />
            </label>
            <br />
            <br />
            <label>Re-Enter your password:<br />
              <input type="password" onChange={this.onPwdVerify} />
            </label>
            <br />
            <br />
            <input type="submit" className="customBtn" />
            <br />
            <br />
          </form>
        </div>
        <div className="col-sm-6">
          <img className="heroImg" src="./images/farmerregisterpage.svg" />
        </div>
     </div>
    );
  }

  onPwdChange = (event) => {
    this.setState({pwd: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPwdVerify = (event) => {
    this.setState({pwdVerify: event.target.value});
  }

  handleSubmit = (event) => {
    if(this.state.pwd === this.state.pwdVerify) {
      this.registerUser();
    } else {
      this.setState({regStatus: 'Dear user, please verify your password.. \nYour passwords didn\'t match.'})
    }
    event.preventDefault();
  }

  registerUser = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd)
      .then((user) => {
        // Signed in 
        // set success message
        this.setState({regStatus: 'User Registered Successfully', regStatusStyle: 'status-success'});
        this.props.history.push('/update-profile');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        this.setState({regStatus: `Error: ${errorCode}\n${errorMessage}`, regStatusStyle: 'status-fail'});
      });
  }
}

export default withRouter(Register);