import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fetchedUser) => {
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setUser(null);
        setError("User doesn't exist yet");
      }
      setLoading(false);
    });
  }, []);

  return { user, error, loading };
};

export default useUser;
