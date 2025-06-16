import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About" },
    { name: "Blog" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#5B5B8F] sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/image/logo.jpeg"
              alt="Logo"
              className="object-cover w-10 h-10 rounded-full"
            />
            <span className="text-2xl font-bold text-white">SwasthyaAI</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="items-center hidden space-x-10 text-lg font-medium text-white md:flex">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`relative hover:text-yellow-300 transition ${
                  isActive(path) ? "text-yellow-400" : ""
                }`}
              >
                {name}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="items-center hidden gap-4 md:flex">
            <Link
              to="/doctorlogin"
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 border border-blue-300 rounded-full shadow-md hover:bg-white hover:text-blue-600"
            >
              <Stethoscope size={18} /> Doctor
            </Link>
            <Link
              to="/patientlogin"
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 border border-green-300 rounded-full shadow-md hover:bg-white hover:text-green-600"
            >
              <User size={18} /> Patient
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center space-y-1 md:hidden"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-2 space-y-4 text-lg font-medium text-white md:hidden">
            <div className="flex flex-col gap-2 px-2 pb-4">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-md ${
                    isActive(path)
                      ? "bg-yellow-400 text-[#5B5B8F]"
                      : "hover:bg-yellow-900/30"
                  }`}
                >
                  {name}
                </Link>
              ))}
              <Link
                to="/doctorlogin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 transition bg-blue-600 border border-blue-200 rounded-full shadow hover:bg-white hover:text-blue-600"
              >
                <Stethoscope size={18} /> Doctor
              </Link>
              <Link
                to="/patientlogin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 transition bg-green-600 border border-green-200 rounded-full shadow hover:bg-white hover:text-green-600"
              >
                <User size={18} /> Patient
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
