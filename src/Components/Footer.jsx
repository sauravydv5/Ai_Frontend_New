import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-gray-200 bg-gradient-to-r from-teal-700 via-blue-700 to-indigo-800">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">AiHealthCare</h2>
            <p className="text-sm text-gray-300">
              Empowering your mental health journey with AI-driven tools,
              personalized care, and real-time support.
            </p>
            <div className="flex mt-4 space-x-4">
              {/* Social Icons */}
              {[
                {
                  label: "Facebook",
                  hover: "hover:text-teal-400",
                  d: "M22 12c0-5.522-4.477...",
                },
                {
                  label: "Twitter",
                  hover: "hover:text-blue-400",
                  d: "M23 3a10.9 10.9 0 01-3.14...",
                },
                {
                  label: "LinkedIn",
                  hover: "hover:text-indigo-400",
                  d: "M4.98 3.5C3.34 3.5...",
                },
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={icon.label}
                  className={`transition ${icon.hover}`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d={icon.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Services", "Blog", "Contact"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#" className="transition hover:text-white">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Newsletter
            </h3>
            <p className="mb-3 text-sm text-gray-300">
              Get mental health tips, news, and updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-1.5 text-sm text-gray-900 rounded-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-sm text-white bg-teal-500 rounded-md hover:bg-teal-600"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Contact</h3>
            <p className="text-sm">123 AI Health St., Wellness City, IN</p>
            <p className="text-sm">support@aihealthcare.com</p>
            <p className="text-sm">+91 12345 67890</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 mt-6 text-xs text-center text-gray-400 border-t border-teal-600">
          &copy; 2025 AiHealthCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
