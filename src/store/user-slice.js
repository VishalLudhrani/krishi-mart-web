import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const initialUserState = {
  data: {
    uid: "",
    name: "",
    email: "",
    photoURL: "",
    address: "",
    category: "",
    phone: "",
  },
  error: "",
  isLoggedIn: false,
  cartExists: false,
  historyExists: false,
};

const user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData(state, action) {
      state.data = action.payload.userData;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
    resetUser(state) {
      state.data = initialUserState.data;
      state.error = initialUserState.error;
      state.isLoggedIn = initialUserState.isLoggedIn;
      state.cartExists = initialUserState.cartExists;
      state.historyExists = initialUserState.historyExists;
    },
    toggleCartState(state, action) {
      state.cartExists = action.payload.cartExists;
    },
    toggleHistoryState(state, action) {
      state.historyExists = action.payload.historyExists;
    },
  },
});

export const userActions = user.actions;

export const getUser = (uid, photoURL) => {
  return (dispatch) => {
    const getUserData = (uid, photoURL) => {
      const userRef = firebase.database().ref("users/");
      userRef.child(uid).on("value", (userSnapshot) => {
        if (userSnapshot.exists()) {
          dispatch(
            userActions.setUserData({
              userData: {
                category: userSnapshot.val()["category"],
                address: userSnapshot.val()["address"],
                phone: userSnapshot.val()["phone"],
                name: userSnapshot.val()["name"],
                uid,
                photoURL,
                email: userSnapshot.val()["email"],
              },
              isLoggedIn: true,
            })
          );
        }
        if (userSnapshot.val()["category"] === "consumer") {
          userRef.child(`${uid}/cart/items`).on("value", (cartSnapshot) => {
            if (cartSnapshot.exists()) {
              dispatch(userActions.toggleCartState({ cartExists: true }));
            } else {
              dispatch(userActions.toggleCartState({ cartExists: false }));
            }
          });
          userRef.child(`${uid}/history/items`).on("value", (historySnapshot) => {
            if (historySnapshot.exists()) {
              dispatch(userActions.toggleHistoryState({ historyExists: true }));
            } else {
              dispatch(userActions.toggleHistoryState({ historyExists: false }));
            }
          })
        }
      });
    };
    try {
      getUserData(uid, photoURL);
    } catch (error) {
      dispatch(userActions.setError({ error }));
    }
  };
};

export default user.reducer;
