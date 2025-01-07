import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { legacy_createStore } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const store = legacy_createStore(reducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
  </Provider>
);
