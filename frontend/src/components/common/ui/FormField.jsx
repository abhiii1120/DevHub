import React from "react";
import FieldLabel from "./FieldLabel";

const FormField = ({ id, label, icon, rightAction, children }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={id} icon={icon}>
          {label}
        </FieldLabel>
        {rightAction}
      </div>
      {children}
    </div>
  );
};

export default FormField;
