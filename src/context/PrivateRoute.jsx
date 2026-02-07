import React from "react";
import useData from "../allHooks/useData";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { loading, user } = useData();
  const location = useLocation();

  // ⏳ Loading state
  if (loading) {
    return <span>Loading...</span>;
  }

  // 🔒 Not logged in → redirect
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // ✅ Authorized
  return children;
}

export default PrivateRoute;
