// src/routes.js
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
  NotFound,
} from "./pages";
import Intro from "./pages/Intro";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import NeedToBeUnauthenticated from "./middlewares/NeedToBeUnauthenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NeedToBeUnauthenticated>
        {" "}
        <Intro />
      </NeedToBeUnauthenticated>
    ),
  },

  {
    path: "/welcome",
    element: (
      <NeedToBeUnauthenticated>
        {" "}
        <Welcome />
      </NeedToBeUnauthenticated>
    ),
  },

  {
    path: "/login",
    element: (
      <NeedToBeUnauthenticated>
        <SignIn />
      </NeedToBeUnauthenticated>
    ),
  },
  {
    path: "/register",
    element: (
      <NeedToBeUnauthenticated>
        <SignUp />
      </NeedToBeUnauthenticated>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "timer",
        element: <Timer />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "edit/:taskId",
        element: <Edit />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
