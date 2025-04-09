import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/Signup";
import Login from "../components/Login";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,      
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    }
  ]);

export default router;