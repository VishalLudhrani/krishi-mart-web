import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const initialUserState = {
  name: "",
  photoURL: "",
  email: "",
  uid: "",
  address: "",
  category: "",
  phone: "",
  error: "",
};

const user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserAuth(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
    },
    setUserData(state, action) {
      state.category = action.payload.category;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
    setError(state, action) {
      state.error = action.payload.error;
    }
  }
});

export const userActions = user.actions;

export const getUser = () => {
  return (dispatch) => {
    const getUserData = (uid) => {
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", (userSnapshot) => {
          if (userSnapshot.exists()) {
            dispatch(userActions.setUserData({
              category: userSnapshot.val()["category"],
              address: userSnapshot.val()["address"],
              phone: userSnapshot.val()["phone"],
            }))
          } else {
            throw new Error("Data not found.");
          }
        });
    };
    const getUserAuth = () => {
      firebase.auth().onAuthStateChanged((fetchedUser) => {
        if (fetchedUser) {
          dispatch(userActions.setUserAuth({
            uid: fetchedUser.uid,
            name: fetchedUser.displayName,
            email: fetchedUser.email,
            photoURL: fetchedUser.photoURL,
          }));
          getUserData(fetchedUser.uid)
        } else {
          throw new Error("Error logging in.");
        }
      });
    };
    try {
      getUserAuth();
    } catch (error) {
      dispatch(userActions.setError({ error }));
    }
  };
};

export default user.reducer;