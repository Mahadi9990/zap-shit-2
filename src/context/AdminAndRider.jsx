import React from "react";
import useData from "../allHooks/useData";
import { Navigate } from "react-router-dom";
import useRole from "../allHooks/useRole";
import Forbiden from "../page/Forbiden/Forbiden";

function AdminAndRider({ children }) {
  const { loading, user } = useData();
  const { role } = useRole();

  // ⏳ Loading state
  if (loading) {
    return <span>Loading...</span>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔒 Not logged in → redirect
  if ( role === "admin" || role === "rider") {
    return <Forbiden />;
  }
  if (role === "user") {
    return children;
  }
  // ✅ Authorized
  
}

export default AdminAndRider;
