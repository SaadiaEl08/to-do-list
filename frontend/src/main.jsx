import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";
import { legacy_createStore } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

const store = legacy_createStore(reducer);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);
