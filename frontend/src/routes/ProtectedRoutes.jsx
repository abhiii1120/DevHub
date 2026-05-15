import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  let { isAuthenticated, isloading } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to={"/"} />;
  if (isloading) return <div>...loading</div>;
  return <Outlet />;
};

export default ProtectedRoutes;
