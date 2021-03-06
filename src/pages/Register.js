import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  state = {
    email: '',
    pwd: '',
    pwdVerify: '',
    regStatus: (
      <p>Password must contain at least 8 characters: including at least one number, small letter, capital letter, and special character</p>
    ),
    regStatusStyle: 'display-block alert alert-info',
    formStyle: '',
    headerStyle: ''
  }

  componentDidMount() {
    document.title = "Register | Krishi Mart";
    var mql = window.matchMedia("screen and (max-width: 576px)");
    this.formStyle(mql)
    mql.addEventListener('change', this.formStyle);
  }

  render() {
    return(
     <div className="row">
        <div className="col-sm-6">
          <h2 id="highlight" className={this.state.headerStyle}>Let's get you registered..</h2>
          <br />
          <div id="highlight" className={this.state.regStatusStyle}>
            {this.state.regStatus}
          </div>
          <form className={this.state.formStyle} id="info" onSubmit={this.handleSubmit}>
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
            <input type="submit" className="customBtn" value='Register' readOnly />
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

  formStyle = (e) => {
    if(e.matches){
      this.setState({
        formStyle: 'content',
        regStatusStyle: 'display-block alert alert-info content',
        headerStyle: 'heroTitle content'
      });
      console.log();
    }
    else{
      this.setState({
        formStyle: '',
        regStatusStyle: 'display-block alert alert-info',
        headerStyle: 'heroTitle'
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let re = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#\$%&\?\@\^*]).{8,}$/;
    if(re.test(this.state.pwd)) {
      if(this.state.pwd === this.state.pwdVerify) {
        this.registerUser();
        console.log('success');
      } else {
        console.log('fail');
        this.setState({
          regStatus: (
            <h3>Dear user, please verify your password.. \nYour passwords didn't match.</h3>
          ),
          regStatusStyle: 'display-block alert alert-danger'
        })
      }
    } else {
      console.log('fail');
      this.setState({
        regStatus: (
          <p><strong>Password Invalid!</strong><br />Password must contain at least 8 characters: including at least one number, small letter, capital letter, and special character</p>
          ),
        regStatusStyle: 'alert alert-danger display-block'
      })
    }
  }

  registerUser = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd)
      .then((user) => {
        // Signed in 
        // set success message
        this.setState({
          regStatus: (<h3>User Registered Successfully</h3>),
          regStatusStyle: 'alert alert-success display-block'
        });
        this.props.history.push('/update-profile');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        this.setState({
          regStatus: (<h3>Error: {errorCode}<br />{errorMessage}</h3>),
          regStatusStyle: 'alert alert-danger display-block'
        });
      });
  }
}

export default withRouter(Register);