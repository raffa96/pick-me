import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "./redux/store";
import theme from "./theme";

import App from "./app";

import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
