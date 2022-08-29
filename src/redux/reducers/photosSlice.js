import { createSlice } from "@reduxjs/toolkit";

import httpClient from "../../api";

const initialState = {
  isLoading: true,
  error: {
    status: false,
    message: "",
  },
  photos: [],
  rateLimit: {
    remaining: null,
    total: 50,
  },
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.photos = [];
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    saveData: (state, action) => {
      state.photos = action.payload;
    },
    updateRateLimit: (state, action) => {
      state.rateLimit = {
        ...action.payload,
      };
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.photos = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
  },
});

const {
  startLoading,
  stopLoading,
  saveData,
  updateRateLimit,
  catchError,
  cleanError,
} = photosSlice.actions;

const photosReducer = photosSlice.reducer;

export const fetchPhotos = (path) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await httpClient.get(path);
    dispatch(saveData(response.data));
    dispatch(
      updateRateLimit({
        total: response.headers["x-ratelimit-limit"],
        remaining: response.headers["x-ratelimit-remaining"],
      })
    );
  } catch (error) {
    dispatch(catchError(error.errors));
  }
  dispatch(stopLoading());
};

export default photosReducer;
