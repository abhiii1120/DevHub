import AnimatedCircles from "@/components/common/ui/AnimatedCircles";
import BackgroundEffects from "@/components/common/ui/BackgroundEffects";
import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen dark flex flex-col items-center justify-center pb-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      <AnimatedCircles />
      <BackgroundEffects
        showDarkOverlay={true}
        showGrid={true}
        lightGridOpacity={0.08}
        darkGridOpacity={0.03}
        gridSize="30px"
        darkOverlayOpacity={0.2}
        darkOverlayBlur="3px"
        zIndex={1}
      />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
