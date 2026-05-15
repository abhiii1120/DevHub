import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { isAuthenticated, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/main" />;
  }

<<<<<<< HEAD
  // if (isAuthenticated) return <Navigate to={"/main"} />;
  // if (isloading) return <div>...loading</div>;
=======
>>>>>>> dd9e65a (Completed auth frontend and backend setup)
  return <Outlet />;
};

export default PublicRoutes;
