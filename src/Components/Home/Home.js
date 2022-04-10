import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

import useUser from "../../hooks/useUser";
import LandingPage from "../LandingPage";
import ConsumerHomePage from "./Consumer/ConsumerHomePage";
import FarmerHomePage from "./Farmer/FarmerHomePage";

const Home = () => {
  let content = (
    <div className="text-center">
      <h3>Loading, please wait...</h3>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userCategory, setUserCategory] = useState("");

  const { user: fetchedUser } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (fetchedUser) {
      setUserIsLoggedIn(true);
      firebase
        .database()
        .ref(`users/${fetchedUser.uid}`)
        .on("value", (userSnapshot) => {
          if (!userSnapshot.hasChildren()) {
            history.push("/update-profile");
          } else {
            setUserCategory(userSnapshot.val()["user_category"]);
          }
        });
    } else {
      setUserIsLoggedIn(false);
    }
  }, [fetchedUser, history]);

  const signupHandler = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(`${errorCode}\n${errorMessage}`);
      });
  };

  if (userIsLoggedIn) {
    if (fetchedUser && userCategory === "consumer") {
      content = <ConsumerHomePage />;
    } 
    if (fetchedUser && userCategory === "farmer") {
      content = <FarmerHomePage />;
    }
  } else {
    content = <LandingPage onSignup={signupHandler} />;
  }

  return content;
};

export default Home;
