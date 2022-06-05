import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user-slice';
import cartReducer from './cart-slice';
import historyReducer from './history-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    history: historyReducer,
  }
})

export default store;