import React from "react";
import { Link } from "react-router";

const Footer = ({ 
  logo = "DevStack",
  copyright = "© 2024 DevStack Partners, Inc. All rights reserved.",
  links = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" }
  ]
}) => {
  return (
    <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {logo}
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {copyright}
          </div>
          <div className="flex gap-4">
            {links.map((link, index) => (
              <a key={index} href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;