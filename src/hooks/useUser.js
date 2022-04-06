import { useState, useEffect } from "react";
import firebase from "firebase";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fetchedUser) => {
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setError("User doesn't exist yet");
      }
    });
  }, []);

  return { user, error };
};

export default useUser;
