import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home";
import About from "../page/About/About";
import Coverage from "../page/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import PrivateRoute from "../context/PrivateRoute";
import BeARider from "../page/BeArider/BeARider";
import SendAPersel from "../page/SendAPersel/SendAPersel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [{
      index:true,
      Component:Home
    },
    {
      path:'beARider',
      element:<PrivateRoute><BeARider/></PrivateRoute>
    },
    {
      path:'sendAPercel',
      element:<PrivateRoute><SendAPersel/></PrivateRoute>
    },
    {
      path:'about',
      Component:About
    },
    {
      path:'coverage',
      Component:Coverage,
      loader:()=>fetch('serviceCenters.json').then(res => res.json())
    }
    ],
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
      path:'login',
      Component:Login
    },{
      path:'register',
      Component:Register
    }
  ]
  }
]);




