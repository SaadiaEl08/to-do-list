import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  Home,
  SignIn,
  SignUp,
  Calendar,
  Timer,
  Profile,
  Setting,
  Edit,
} from "./pages";
import Intro from "./pages/Intro";
import Welcome from "./pages/Welcome";
const router = createBrowserRouter([
  { path: "/", element: <Intro /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "calendar", element: <Calendar /> },
      { path: "timer", element: <Timer /> },
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "edit/:taskId", element: <Edit /> },
    ],
  },
  { path: "*", element: <h1>Not found</h1> },
]);

export default router;
