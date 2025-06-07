import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5B5B8F] w-full shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 gap-3">
            <img src="/image/logo.jpeg" alt="Logo" className="w-auto h-9" />
            <span className="text-xl font-semibold text-white">SwasthyaAI</span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 text-white font-medium text-[17px]">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="items-center hidden gap-4 md:flex">
            <Link
              to="/doctorlogin"
              className="px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition"
            >
              Start as Doctor
            </Link>
            <Link
              to="/patientlogin"
              className="px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition"
            >
              Start as Patient
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 text-white font-medium text-[17px]">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-300"
            >
              About
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-300"
            >
              Blog
            </Link>
            <Link
              to="/doctor/start"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition text-center"
            >
              Start as Doctor
            </Link>
            <Link
              to="/patient/start"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition text-center"
            >
              Start as Patient
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
