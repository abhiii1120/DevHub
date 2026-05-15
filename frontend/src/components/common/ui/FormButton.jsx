import { Button } from "@/components/ui/button";
import React from "react";

const FormButton = ({ children, buttonType = "primary", className, ...props }) => {
  return (
    <Button
      {...props}
      className={` ${
        buttonType === "primary"
          ? " bg-primary hover:bg-primary/90 text-primary-foreground tracking-wide text-base"
          : buttonType === "secondary"
            ? "w-full border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            : "w-full border-none bg-transparent"
      } 
         w-full h-11 gap-2 font-semibold tracking-wide ${className}`}
    >
      {children}
    </Button>
  );
};

export default FormButton;
