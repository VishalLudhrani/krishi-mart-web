import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fetchedUser) => {
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setUser(null);
        setError("User doesn't exist yet");
      }
    });
  }, []);

  return { user, error };
};

export default useUser;
