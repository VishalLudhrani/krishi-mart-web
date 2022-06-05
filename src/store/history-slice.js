import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/database";

const initialHistorySlice = {
  data: {
    items: [], 
  },
  error: null,
  changed: false,
};

const historySlice = createSlice({
  name: "history",
  initialState: initialHistorySlice,
  reducers: {
    addToHistory(state, action) {
      state.data.items.push(...action.payload.items);
      state.changed = true;
    },
    resetHistoryChanged(state) {
      state.changed = initialHistorySlice.changed;
    },
    resetHistory(state) {
      state.data = initialHistorySlice.data;
      state.error = initialHistorySlice.error;
      state.changed = initialHistorySlice.changed;
    },
    replaceHistory(state, action) {
      state.data = action.payload.history;
    }
  }
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;

export const fetchHistory = (uid) => (dispatch) => {
  const fetchData = () => {
    firebase
      .database()
      .ref(`users/${uid}/history`)
      .on("value", (historySnapshot) => {
        let items = [];
        if (historySnapshot.exists()) {
          items = historySnapshot.val()["items"];
        }
        dispatch(historyActions.replaceHistory({ history: {items: items} }))
      });
  };

  try {
    fetchData();
  } catch (error) {
    console.error(error);
  }
};

export const sendHistory = (uid, history) => (dispatch) => {
  const sendData = () => {
    firebase
      .database()
      .ref(`users/${uid}/history`)
      .set(history)
      .then(() => {
        dispatch(historyActions.resetHistory());
      });
  };
  try {
    sendData();
  } catch (error) {
    console.error(error);
  }
}