import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "@/layouts/MainLayout";
import MainPage from "@/pages/MainPage";
import ForgotPassword from "@/pages/ForgetPassword";
import ProjectsPage from "@/pages/ProjectsPage";
const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "/signup",
              element: <Signup />,
            },
            {
              path: "/forget-password",
              element: <ForgotPassword />,
            },
          ],
        },
      ],
    },
    {
      path: "/main",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <MainPage />,
            },
            {
              path: "/main/projects",
              element: <ProjectsPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
