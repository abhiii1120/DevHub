import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const FeatureCard = ({ 
  icon: Icon,
  title,
  description,
  features = [],
  ctaText = null,
  ctaLink = null,
  className = ""
}) => {
  return (
    <div className={`group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-2 ${className}`}>
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <ChevronRight className="w-4 h-4 text-primary" />
              {feature}
            </div>
          ))}
        </div>
      )}
      {ctaText && (
        <div className="mt-4">
          <a href={ctaLink} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;