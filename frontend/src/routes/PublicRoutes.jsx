import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  let { isAuthenticated, isloading } = useSelector((store) => store.auth);

  // if (isAuthenticated) return <Navigate to={"/main"} />;
  // if (isloading) return <div>...loading</div>;
  return <Outlet />;
};

export default PublicRoutes;
