import { Input } from "@/components/ui/input";
import React from "react";

const FormInput = ({ className = "", ...props }) => {
  return (
    <Input
      {...props}
      className={`bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono text-[14px] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary focus-visible:border-primary h-11 ${className}`}
    />
  );
};

export default FormInput;
