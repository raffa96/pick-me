import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import photosReducer from "./reducers/photosSlice";

const rootReducer = combineReducers({
  photos: photosReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
