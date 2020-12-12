import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  state = {
    email: '',
    pwd: '',
    pwdVerify: '',
    editUserStyle: '',
    regStatus: '',
    regStatusStyle: ''
  }

  componentDidMount() {
    document.title = "Register | Krishi Mart";

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({editUserStyle: "btn display-block"});
        console.log(user.email);
      } else {
        this.setState({editUserStyle: "btn display-none"});
      }
    });
  }

  render() {
    return(
      <div className="content">
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
          <input type="submit" className="btn" />
          <br />
          <br />
        </form>
        <button className={this.state.editUserStyle}><Link className="btn" to={'/update-profile'}>{"Next >"}</Link></button>
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
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        this.setState({regStatus: `Error: ${errorCode}\n${errorMessage}`, regStatusStyle: 'status-fail'});
      });
  }
}

export default Register;