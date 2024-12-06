import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {Home,SignIn,SignUp} from "./pages"
const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <SignIn />
        },
        {
            path: "/register",
            element: <SignUp />
        },
        {
            path: "/",
            element: <App />,
            children: [
                { path: "", element: <Home /> },
            ]
        },
        { path: "*", element: <h1>Not found</h1>}

    ]


);

export default router;