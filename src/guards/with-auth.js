import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return withRouter(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
        };
        this.history = props.history;
      }
      componentDidMount() {
        firebase.auth().onAuthStateChanged((fetchedUser) => {
          if (fetchedUser) {
            this.setState({
              isLoggedIn: true,
            });
          } else {
            this.setState({
              isLoggedIn: false,
            });
            this.history.push("/");
          }
        });
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
};

export default withAuth;
