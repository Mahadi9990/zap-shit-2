import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home";
import About from "../page/About/About";
import Coverage from "../page/Coverage/Coverage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [{
      index:true,
      Component:Home
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
]);




