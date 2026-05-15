import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const AuthCard = ({ children }) => {
  return (
    <Card className="w-full bg-card border-border shadow-[0_4px_6px_-1px_rgba(100,116,139,0.08),0_20px_40px_-8px_rgba(100,116,139,0.16)]">
      <CardContent className="px-8 py-9">{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
