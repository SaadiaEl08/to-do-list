import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home, SignIn, SignUp, Calendar, Timer,Profile } from "./pages";
import Intro from "./pages/Intro";
import Welcome from "./pages/Welcome";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "calendar", element: <Calendar /> },
      { path: "timer", element: <Timer /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "*", element: <h1>Not found</h1> },
]);

export default router;
