import React from "react";
import useData from "../allHooks/useData";
import { Navigate } from "react-router-dom";
import useRole from "../allHooks/useRole";
import Forbiden from "../page/Forbiden/Forbiden";

function RiderRoute({ children }) {
  const { loading } = useData();
  const { isloading, role } = useRole();

  // ⏳ Loading state
  if (loading || isloading) {
    return <span>Loading...</span>;
  }

  // 🔒 Not logged in → redirect
  if (role !== "rider") {
    return <Forbiden />;
  }

  // ✅ Authorized
  return children;
}

export default RiderRoute;
