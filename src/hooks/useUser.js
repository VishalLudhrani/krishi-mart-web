import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/user-slice";

const useUser = () => {
  const { data, error, isLoggedIn, cartExists, historyExists } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fetchedUser) => {
      if (fetchedUser && !isLoggedIn) {
        dispatch(getUser(fetchedUser.uid, fetchedUser.photoURL));
      }
    });
  }, [dispatch, isLoggedIn]);

  return { data, error, isLoggedIn, cartExists, historyExists };
};

export default useUser;
