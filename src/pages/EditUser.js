import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class EditUser extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    uid: '',
    userAddress: '',
    userPhNo: '',
    userCategory: '',
    editUserContent: (
      <div>
        <h2>Please wait while we load your profile..</h2>
      </div>
    )
  }

  componentDidMount() {
    document.title = "Update Profile | Krishi Mart";

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          userName: user.displayName,
          uid: user.uid,
          userEmail: user.email,
          editUserContent: (
            <form onSubmit={this.handleSubmit}>
              <label>Name: <br />
                <input type="text" defaultValue='' onChange={this.handleNameChange} required />
              </label>
              <br />
              <br />
              <label>E-Mail: <br />
                <input type="text" value={user.email} disabled />
              </label>
              <br />
              <br />
              <label>Phone: <br />
                <input type="text" defaultValue='' onChange={this.handlePhNoChange} required />
              </label>
              <br />
              <br />
              <label>Choose category: <br />
                <div onChange={this.handleCategoryChange}>
                  <input type="radio" value="consumer" name="category" />Consumer
                  &emsp;
                  <input type="radio" value="farmer" name="category" />Farmer
                </div>
              </label>
              <br />
              <br />
              <label>Address: <br />
                <textarea rows="5" cols="50" defaultValue='' onChange={this.handleAddressChange} placeholder="M.K Road, New Delhi" required />
              </label>
              <br />
              <br />
              <input className="customBtn" type="submit" value="Submit" />
            </form>
          )
        });
      } else {
        this.setState({
          editUserContent: (
            <div>
              <h1>Seems like you're logged out..</h1>
              <h3>Please Login if you're an existing user..</h3>
              <button className="customBtn"><Link className="customBtn" to={'/login'}>Login</Link></button>
              <h3>Please Register if you're a new user..</h3>
              <button className="customBtn"><Link className="customBtn" to={'/register'}>Register</Link></button>
            </div>
          )
        })
      }
    });
  }

  render() {
    return(
      <div className="content">
        {this.state.editUserContent}
      </div>
    );
  }

  handleNameChange = (event) => {
    this.setState({userName: event.target.value});
    firebase.auth().currentUser.updateProfile({displayName: event.target.value});
  }

  handlePhNoChange = (event) => {
    this.setState({userPhNo: event.target.value});
  }

  handleCategoryChange = (event) => {
    this.setState({userCategory: event.target.value});
  }

  handleAddressChange = (event) => {
    this.setState({userAddress: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    firebase.firestore().collection(`${this.state.userCategory}`).doc(`${this.state.uid}`).set({
      name: this.state.userName,
      email: this.state.userEmail,
      ph_no: this.state.userPhNo,
      address: this.state.userAddress
    }).then(() => {
      alert("Profile updated successfully");
    }).catch((error) => {
      alert(`Error: ${error.code}\n${error.message}`);
    });
  }
}

export default EditUser;