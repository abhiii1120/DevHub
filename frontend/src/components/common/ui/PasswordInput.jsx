import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ id, value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        autoComplete="current-password"
        className=" bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono text-[14px] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary focus-visible:border-primary h-11 pr-10"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none text-muted-foreground hover:text-foreground transition-colors"
      >
        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default PasswordInput;
