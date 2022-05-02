import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user-slice';
import cartReducer from './cart-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  }
})

export default store;