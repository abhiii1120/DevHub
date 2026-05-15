import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { isAuthenticated, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/main" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
