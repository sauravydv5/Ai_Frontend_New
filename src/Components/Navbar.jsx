import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
    <nav className="bg-[#5B5B8F] sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-90">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/image/logo.jpeg" alt="Logo" className="w-auto h-9" />
            <span className="text-2xl font-extrabold tracking-wide text-white">
              SwasthyaAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-10 text-lg font-semibold text-white md:flex">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`relative px-3 py-2 rounded-md transition-colors ${
                  isActive(path)
                    ? "text-yellow-400"
                    : "hover:text-yellow-300 hover:bg-yellow-900/20"
                }`}
              >
                {name}
                {isActive(path) && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Buttons on desktop */}
          <div className="hidden space-x-4 md:flex">
            <Link
              to="/doctorlogin"
              className="px-5 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#5B5B8F] transition"
            >
              Start as Doctor
            </Link>
            <Link
              to="/patientlogin"
              className="px-5 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#5B5B8F] transition"
            >
              Start as Patient
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center space-y-1 md:hidden focus:outline-none"
          >
            <span
              className={`block h-1 w-6 bg-white rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-1 w-6 bg-white rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-1 w-6 bg-white rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 mt-2" : "max-h-0"
          }`}
        >
          <div className="flex flex-col px-2 pb-4 space-y-4 text-lg font-semibold text-white">
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
              className="block px-5 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#5B5B8F] text-center"
            >
              Start as Doctor
            </Link>
            <Link
              to="/patientlogin"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#5B5B8F] text-center"
            >
              Start as Patient
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
