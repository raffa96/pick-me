import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: {
    status: false,
    message: "",
  },
  photos: [],
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

const { startLoading, stopLoading, saveData, catchError, cleanError } =
  photosSlice.actions;

const photosReducer = photosSlice.reducer;

export default photosReducer;
