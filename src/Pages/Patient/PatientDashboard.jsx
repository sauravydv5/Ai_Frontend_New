import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import PatientMenu from "../../Components/PatientSidebar";

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
  const patientName = patientInfo?.name || "Patient";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientInfo");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };

  const quotes = [
    "Your health is your wealth 💚",
    "Stay hydrated, stay energized 💧",
    "Mental health is just as important 🧠",
    "A healthy lifestyle is a journey 🚶‍♂️",
    "Prevention is powerful 🛡️",
    "Eat well, feel well 🍎",
    "Wellness begins from within 🌱",
    "Sleep is the best meditation 💤",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000); // change every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 text-white shadow-lg bg-gradient-to-b from-green-700 to-teal-900">
        <div className="flex flex-col justify-between h-full">
          {/* Logo */}
          <div className="py-6 text-center border-b border-teal-600">
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-green-400 via-teal-300 to-blue-500 bg-clip-text drop-shadow-md">
              Swāthya AI
            </h1>
            <p className="mt-1 text-xs italic text-gray-300">
              Your Health Companion
            </p>
          </div>

          {/* Menu */}
          <nav className="px-4 py-6 space-y-2">
            {PatientMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-gray-900 shadow-inner"
                      : "hover:bg-teal-600 hover:shadow-lg"
                  }`}
                >
                  <span className="mr-3 text-lg">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}

            {/* Logout */}
            <div
              onClick={handleLogout}
              className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🚪</span> Logout
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 text-sm text-center border-t border-teal-600">
            © 2025 Swāthya
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b shadow-sm bg-gradient-to-r from-white to-gray-100">
          <div className="text-xl font-semibold text-gray-700 lg:hidden">☰</div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Date & Health Quote */}
            <div className="flex-col hidden text-sm text-right md:flex">
              <span className="font-semibold text-gray-500">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-base italic text-teal-600">
                {quotes[quoteIndex]}
              </span>
            </div>

            {/* Profile */}
            <Link
              to="/patient-dashboard/profileview"
              className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
            >
              Hi,
              {patientInfo?.firstName
                ? patientInfo.firstName
                : patientInfo?.name}
            </Link>
          </div>
        </header>

        {/* Nested Routes Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
