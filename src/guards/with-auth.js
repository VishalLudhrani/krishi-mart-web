import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const withAuth = (WrappedComponent) => {
  return connect(
    mapStateToProps,
    null
  )(
    withRouter(
      class extends React.Component {
        componentDidUpdate() {
          if (!this.props.isLoggedIn) {
            this.props.history.push("/");
          }
        }
        render() {
          return <WrappedComponent {...this.props} />;
        }
      }
    )
  );
};

export default withAuth;
