import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import photosReducer from "./reducers/photosSlice";
import cartReducer from "./reducers/cartSlice";

const rootReducer = combineReducers({
  photos: photosReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
