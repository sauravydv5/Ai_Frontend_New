import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5B5B8F] w-full shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src="/image/logo.jpeg" alt="Logo" className="w-auto h-9" />
            <span className="text-xl font-semibold text-white">SwasthyaAI</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-white font-[550] text-[17px]">
            <ul className="flex gap-6">
              <li className="cursor-pointer hover:text-gray-300">Home</li>
              <li className="cursor-pointer hover:text-gray-300">About</li>
              <li className="cursor-pointer hover:text-gray-300">Pricing</li>
              <li className="cursor-pointer hover:text-gray-300">Blog</li>
              <li className="cursor-pointer hover:text-gray-300">Contact Us</li>
              <li className="cursor-pointer hover:text-gray-300">Shop</li>
            </ul>
            <button className="ml-4 px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              className="text-2xl text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col gap-3 text-white font-[550] text-[17px] mt-4">
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer hover:text-gray-300">Home</li>
              <li className="cursor-pointer hover:text-gray-300">About</li>
              <li className="cursor-pointer hover:text-gray-300">Pricing</li>
              <li className="cursor-pointer hover:text-gray-300">Blog</li>
              <li className="cursor-pointer hover:text-gray-300">Contact Us</li>
              <li className="cursor-pointer hover:text-gray-300">Shop</li>
            </ul>
            <button className="mt-2 w-fit px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#5B5B8F] transition">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
