import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import useAuth from "../Hooks/useAuth";

const ProtectedRoute = () => {
  const {
    user,
    token,
    loading,
  } = useAuth();

  const location =
    useLocation();

  /*
   * Wait until authentication
   * restoration is finished.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#254593]" />
      </div>
    );
  }

  /*
   * User is not authenticated
   */
  if (!user || !token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /*
   * User authenticated
   */
  return <Outlet />;
};

export default ProtectedRoute;