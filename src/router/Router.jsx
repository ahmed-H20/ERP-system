import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signin from "../components/Login";



const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,      
    },
    {
        path: "/signin",
        element: <Signin/>
    }
  ]);

export default router;