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
import Dashboard from "../layout/Dashboard";
import AllParcel from "../page/Dashboard/AllParcel";
import Item1 from "../page/Dashboard/Item1";
import Payment from "../page/Dashboard/Payment";
import PaymentSuccess from "../page/Dashboard/PAYMENT/PaymentSuccess";
import PaymentCencelled from "../page/Dashboard/PAYMENT/PaymentCencelled";
import PaymentHistory from "../page/Dashboard/PaymentHistory/PaymentHistory";
import RiderApprovial from "../page/Dashboard/RiderApprovial/RiderApprovial";
import UserManegment from "../page/Dashboard/UserManegment/UserManegment";
import AdminRoute from "../context/AdminRoute";
import RiderRoute from "../context/RiderRoute";
import AssianRider from "../page/Dashboard/AssianRider/AssianRider";
import AdminAndRider from "../context/AdminAndRider";
import OnlyRiderCanSaw from "../page/Dashboard/RiderShowPage/OnlyRiderCanSaw";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "beARider",
        loader: () => fetch("serviceCenters.json").then((res) => res.json()),
        element: (
          <AdminAndRider>
            <BeARider />
          </AdminAndRider>
        ),
      },
      {
        path: "sendAPercel",
        loader: () => fetch("serviceCenters.json").then((res) => res.json()),
        element: (
          <AdminAndRider>
            <SendAPersel />
          </AdminAndRider>
        ),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "allParcel",
        Component: AllParcel,
      },
      {
        path: "history",
        Component: PaymentHistory,
      },
      {
        path: "payment/:paymentId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCencelled,
      },
      {
        path: "riderApprovial",
        element: (
          <AdminRoute>
            <RiderApprovial />
          </AdminRoute>
        ),
      },
      {
        path: "userMenagment",
        element: (
          <AdminRoute>
            <UserManegment />
          </AdminRoute>
        ),
      },
      {
        path: "assianRider",
        element: (
          <AdminRoute>
            <AssianRider />
          </AdminRoute>
        ),
      },
      {
        path: "RiderCanSee",
        element: (
          <RiderRoute>
            <OnlyRiderCanSaw />
          </RiderRoute>
        ),
      },
    ],
  },
]);
