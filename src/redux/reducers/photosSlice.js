import { createSlice } from "@reduxjs/toolkit";

import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/helpers";
import httpClient from "../../api";

const isSaveSearch = (action) => action.type.endsWith("/saveSearch");

const path = getItemFromLocalStorage("search")?.path || "";

const itemPerPage = getItemFromLocalStorage("search")?.itemPerPage || null;

const type = getItemFromLocalStorage("search")?.type || "";

const query = getItemFromLocalStorage("search")?.query || "";

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
  search: {
    path,
    itemPerPage,
    type,
    query,
  },
  pagination: {
    hasNextPage: null,
    hasPrevPage: null,
    totalPages: null,
    currentPage: 1,
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
    saveSearch: (state, action) => {
      state.search = { ...action.payload };
    },
    updateRateLimit: (state, action) => {
      state.rateLimit = {
        ...action.payload,
      };
    },
    updatePagination: (state, action) => {
      state.pagination.hasNextPage = action.payload.hasNextPage;
      state.pagination.hasPrevPage = action.payload.hasPrevPage;
      state.pagination.totalPages = action.payload.totalPages;
    },
    updateCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
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
  extraReducers: (builder) => {
    builder.addMatcher(isSaveSearch, (state) => {
      setItemToLocalStorage("search", state.search);
    });
  },
});

const {
  startLoading,
  stopLoading,
  saveData,
  saveSearch,
  updateRateLimit,
  updatePagination,
  updateCurrentPage,
  catchError,
  cleanError,
} = photosSlice.actions;

export { cleanError, catchError, saveSearch, updateCurrentPage };

export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await httpClient.get(path);
    if (response && response.data && response.data.results) {
      const results = response.data.results;
      const totalPages = response.data.total_pages;
      const { currentPage } = getState().photos.pagination;
      const paginationInfo = {
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage + 1 <= totalPages,
        totalPages,
      };
      if (results.length === 0) {
        dispatch(catchError(["No results found"]));
      }
      dispatch(saveData(results));
      dispatch(updatePagination(paginationInfo));
    } else {
      dispatch(saveData(response.data));
    }

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

const photosReducer = photosSlice.reducer;

export default photosReducer;
