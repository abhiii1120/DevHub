import { Button } from "@/components/ui/button";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import FormButton from "../ui/FormButton";

const Navbar = () => {
  let navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/5 border-outline-variant/20">
      <nav className="flex justify-between items-center h-20 w-full max-w-[1440px] mx-auto">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-12">
          <Link
            className="text-[#ADC6FF] font-bold text-3xl leading-10 tracking-tight"
          >
            DevStack
          </Link>
          <div className="hidden md:flex gap-8">
            <NavLink>Explore</NavLink>
            <NavLink>Projects</NavLink>
            <NavLink>Blogs</NavLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 justify-items-end">
          <FormButton type="ternery" onClick={() => navigate("/")} className={'w-fit'}>
            Login
          </FormButton>
          <FormButton onClick={() => navigate("/")} className={'p-6 rounded-md'}>Create Project</FormButton>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
