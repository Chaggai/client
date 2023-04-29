import React from "react";
import ReactDOM from "react-dom/client";

import "normalize.css";
import "typeface-roboto";
import "./index.css";

import Root from "./routes/Root";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
