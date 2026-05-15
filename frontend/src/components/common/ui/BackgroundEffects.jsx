import React from "react";

const BackgroundEffects = ({
  showDarkOverlay = true,
  showGrid = true,
  lightGridOpacity = 0.08,
  darkGridOpacity = 0.01,
  gridSize = "30px",
  lineWidth = "1px",
  darkOverlayOpacity = 0.8,
  darkOverlayBlur = "30px",
  zIndex = 1,
}) => {
  return (
    <>
      {showDarkOverlay && (
        <div
          className="absolute inset-0 pointer-events-none dark:block hidden"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${darkOverlayOpacity})`,
            backdropFilter: `blur(${darkOverlayBlur})`,
            zIndex,
          }}
        />
      )}

      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none block dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, ${lightGridOpacity}) ${lineWidth}, transparent ${lineWidth}),
              linear-gradient(to bottom, rgba(0, 0, 0, ${lightGridOpacity}) ${lineWidth}, transparent ${lineWidth})
            `,
            backgroundSize: `${gridSize} ${gridSize}`,
            backgroundPosition: "center center",
            zIndex,
          }}
        />
      )}

      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, ${darkGridOpacity}) ${lineWidth}, transparent ${lineWidth}),
              linear-gradient(to bottom, rgba(255, 255, 255, ${darkGridOpacity}) ${lineWidth}, transparent ${lineWidth})
            `,
            backgroundSize: `${gridSize} ${gridSize}`,
            backgroundPosition: "center center",
            zIndex,
          }}
        />
      )}
    </>
  );
};

export default BackgroundEffects;
