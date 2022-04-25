import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

import useUser from "../hooks/useUser";
import LandingPage from "./LandingPage";
import ConsumerHomePage from "../components/Home/Consumer/ConsumerHomePage";
import FarmerHomePage from "../components/Home/Farmer/FarmerHomePage";

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
          if (!userSnapshot.hasChild("category")) {
            history.push("/profile/edit");
          } else {
            setUserCategory(userSnapshot.val()["category"]);
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
      .then((result) => {
        const user = result.user;
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({
            name: user.displayName,
            email: user.email,
          })
      })
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
