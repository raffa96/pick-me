import { createSlice, createAction, isAnyOf } from "@reduxjs/toolkit";

import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/helpers";

const removeFromCart = createAction("cart/removeFromCart");

const isAddToCartAction = (action) => action.type.endsWith("/addToCart");

const isRemoveFromCartAction = (action) =>
  action.type.endsWith("/removeFromCart");

const isCartCleanAction = (action) => action.type.endsWith("/cleanCart");

const isCartAction = (action) => {
  return isAnyOf(
    isAddToCartAction,
    isRemoveFromCartAction,
    isCartCleanAction
  )(action);
};

const localStorageCart = getItemFromLocalStorage("cart");

const localStorageTotal = getItemFromLocalStorage("total");

const initialState = {
  cart: localStorageCart ? localStorageCart : [],
  total: localStorageTotal ? localStorageTotal : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    cleanCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCart, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      })
      .addMatcher(isAddToCartAction, (state, action) => {
        state.total += action.payload.likes;
      })
      .addMatcher(isRemoveFromCartAction, (state, action) => {
        state.total -= action.payload.likes;
      })
      .addMatcher(isCartAction, (state) => {
        setItemToLocalStorage("cart", state.cart);
        setItemToLocalStorage("total", state.total);
      })
      .addDefaultCase((state) => state);
  },
});

export const { addToCart, cleanCart } = cartSlice.actions;

const addSingleItemToCart = (item) => (dispatch, getState) => {
  const { cart } = getState().cart;
  const itemAlreadyInCart = cart.find((cartItem) => cartItem.id === item.id);
  if (itemAlreadyInCart) {
    return;
  }
  dispatch(addToCart(item));
};

export { addSingleItemToCart, removeFromCart };

export default cartSlice.reducer;
