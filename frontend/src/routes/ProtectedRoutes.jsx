import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (store) => store.auth
  );

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;