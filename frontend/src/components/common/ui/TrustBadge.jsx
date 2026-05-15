import React from "react";

const TrustBadge = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-muted-foreground" />
      <span
        className="font-mono text-[9px] text-muted-foreground
                     tracking-widest uppercase"
      >
        {label}
      </span>
    </div>
  );
};

export default TrustBadge;
