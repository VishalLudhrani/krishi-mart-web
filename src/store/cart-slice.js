import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/database";

const initialCartState = {
  data: {
    totalItems: 0,
    totalAmount: 0,
    items: [],
  },
  error: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      state.data.items.push({
        ...action.payload.product,
        id: action.payload.id
      });
      state.data.totalAmount += action.payload.product.price;
      state.data.totalItems++;
    },
    removeFromCart(state, action) {
      const targetItem = state.data.items.find(item => item.id === action.payload.id);
      state.data.items = state.data.items.filter(item => item.id !== action.payload.id);
      state.data.totalAmount -= targetItem.price;
      state.data.totalItems--;
    },
    resetCart(state) {
      state.data = initialCartState.data;
      state.error = initialCartState.error;
    },
    replaceCart(state, action) {
      state.data = action.payload.cart
    }
  }
});

export const cartActions = cartSlice.actions;

export const sendCartData = (uid, cart) => (dispatch) => {
  const sendData = () => {
    firebase
      .database()
      .ref("users/" + uid + "/cart")
      .set(cart)
  }
  try {
    sendData();
  } catch (error) {
    console.error(error);
  }
}

export const fetchCartData = (uid) => (dispatch) => {
  const fetchData = () => {
    firebase
    .database()
    .ref("users/" + uid + "/cart")
    .on("value", (cartSnapshot) => {
      if (cartSnapshot.exists()) {
        let items = [];
        if (cartSnapshot.hasChild("items")) {
          items = cartSnapshot.val()["items"];
        }
        dispatch(cartActions.replaceCart({
          cart: {
            totalAmount: cartSnapshot.val()["totalAmount"],
            totalItems: cartSnapshot.val()["totalItems"],
            items,
          }
        }))
      }
    });
  }
  try {
    fetchData();
  } catch (error) {
    console.error(error);
  }
}

export default cartSlice.reducer;