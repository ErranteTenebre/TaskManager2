import React from "react";
import ReactDOM from "react-dom/client";
import "Scss/index.scss";
import "Scss/app.scss";
import App from "App";
import AuthProvider from "Context/AuthContext";
import { Provider } from "react-redux";

import store from "store/store";
import { DataProvider } from "Context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
