import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5B5B8F] w-full shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/image/logo.jpeg" alt="Logo" className="w-auto h-9" />
            <span className="text-xl font-semibold text-white">SwasthyaAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium text-[17px]">
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
            </ul>
            <button className="ml-4 px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-2xl text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 text-white font-medium text-[17px] space-y-3">
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  Shop
                </Link>
              </li>
            </ul>
            <button className="mt-2 px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
