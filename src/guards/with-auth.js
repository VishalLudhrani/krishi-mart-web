import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
      }
    }
    componentDidMount() {
      firebase
        .auth()
        .onAuthStateChanged((fetchedUser) => {
          if (fetchedUser) {
            this.setState({
              isLoggedIn: true,
            })
          } else {
            this.setState({
              isLoggedIn: false,
            })
            window.location.href = "/";
          }
        })
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withAuth;