import { useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

import useUser from "../hooks/useUser";
import LandingPage from "./LandingPage";
import ConsumerHomePage from "../components/Home/Consumer/ConsumerHomePage";
import FarmerHomePage from "../components/Home/Farmer/FarmerHomePage";
import { useDispatch } from "react-redux";
import { getUser } from "../store/user-slice";

const Home = () => {
  let content = (
    <div className="text-center">
      <h3>Loading, please wait...</h3>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const { data: fetchedUser, isLoggedIn } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      firebase
        .database()
        .ref(`users/${fetchedUser.uid}`)
        .on("value", (userSnapshot) => {
          if (!userSnapshot.hasChild("category")) {
            history.push("/profile/edit");
          }
        });
    }
  }, [fetchedUser, history, isLoggedIn]);

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
          .update({
            name: user.displayName,
            email: user.email,
          });
        dispatch(getUser(user.uid, user.photoURL));
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(`${errorCode}\n${errorMessage}`);
      });
  };

  if (isLoggedIn) {
    if (fetchedUser.category === "consumer") {
      content = <ConsumerHomePage />;
    } 
    if (fetchedUser.category === "farmer") {
      content = <FarmerHomePage />;
    }
  } else {
    content = <LandingPage onSignup={signupHandler} />;
  }

  return content;
};

export default Home;
