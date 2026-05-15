import React from "react";

const GlassCard = ({ children, className = "", hoverColor = "primary" }) => {
  const hoverMap = {
    primary: "hover:border-primary/40",
    secondary: "hover:border-secondary/40",
    tertiary: "hover:border-tertiary/40",
  };
  return (
    <div
      className={`
        bg-[rgba(18,33,49,0.4)] backdrop-blur-[12px]
        border border-white/10 rounded
        transition-all ${hoverMap[hoverColor] ?? ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
