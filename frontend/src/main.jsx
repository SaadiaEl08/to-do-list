import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { legacy_createStore } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import { ThemeProvider } from "./contexts/ThemeContext";

const store = legacy_createStore(reducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </Provider>
);
