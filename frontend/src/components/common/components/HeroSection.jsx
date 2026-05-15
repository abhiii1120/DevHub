import React from "react";
import { Link } from "react-router";
import { ArrowRight, Zap, Shield, Globe, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FormButton from "../ui/FormButton";

function GlassCard({ children, className = "", hoverColor = "primary" }) {
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
}

const HeroSection = () => {
  return (
     <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 z-10">
          <Badge className={'text-[#ADC6FF] bg-[#ADC6FF]/5 mb-5'}>v2.0 is now live</Badge>

          <h1
            className="text-on-surface mb-6 leading-[1.1]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "48px", lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: 700 }}
          >
            The Ultimate Stack for{" "}
            <span className="text-[#ADC6FF]">Modern Developers</span>
          </h1>

          <p className="text-on-surface-variant text-lg mb-10 max-w-xl leading-relaxed">
            The performance-first platform to showcase your technical expertise.
            Share high-impact projects, write deep-dive technical blogs, and
            build a portfolio that stands out in the industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <FormButton className="px-12 py-8 w-fit bg-[#ADC6FF] rounded-sm text-gray-800">
              Get Started - It's Free
            </FormButton>
          </div>
        </div>

        {/* Right: Dashboard preview */}
        <div className="lg:col-span-5 relative">
          <GlassCard className="p-2 relative overflow-hidden aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi6R0Y8SS23b_9XxBtASe1vxXfqfh6iPcY4G3S_SFyjG-XZ6NW0Jv13YKdF7qpkl-Pwrf5CfgWtbbdzUYGv7bWtqb-kvG44Gk5ypgNUrjqTmP9qCw0YjT7phLGTKPsd44EDpJyGV6NpUG_AWnjNvkQq00H451EzDVm_N13UpCX8EQ522Py57usgHIz9ok_8a4WDsE5g6BtesnzR6hGXDKU6C0W_nnc0v_XkHjQ8AWKaLSr9FttLXn_dx6RyOz0o7Q-b6a5gCVJY3g"
              alt="Developer Dashboard Preview"
              className="w-full h-full object-cover rounded opacity-80 mix-blend-lighten"
            />
            {/* Status bar */}
            <div
              className="absolute bottom-6 left-6 right-6 p-4 rounded border border-primary/20"
              style={{ background: "rgba(18,33,49,0.4)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span
                  className="text-[#ADC6FF]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
                >
                  System Online: 99.9% Uptime
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Decorative glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
    </section>
  );
};

export default HeroSection;