import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import DoctorMenu from "../../Components/DoctorSidebar";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorName = doctor?.firstName || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/", { replace: true });
    window.location.reload();
  };

  const quotes = [
    "Health is wealth 💪",
    "A calm mind brings inner strength ✨",
    "Eat healthy, stay healthy 🍎",
    "Prevention is better than cure 🩺",
    "An ounce of prevention is worth a pound of cure",
    "Good health is true wealth",
    "Your body hears everything your mind says",
    "Happiness is the highest form of health",
    "Take care of your body, it’s the only place you have to live",
    "Health is a relationship between you and your body",
    "Self-care is how you take your power back",
    "Healthy outside starts from the inside",
    "Let food be thy medicine",
    "Every human being is the author of their own health",
    "Movement is a medicine",
    "You are what you eat",
    "Nourish to flourish",
    "Don't dig your grave with your own knife and fork",
    "To keep the body in good health is a duty",
    "Wellness is the natural state of my body",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  const appointmentCount = 2;

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 text-white shadow-lg bg-gradient-to-b from-indigo-900 to-purple-700">
        <div className="flex flex-col justify-between h-full">
          <div className="py-6 text-center border-b border-purple-600">
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
              Swāthya AI
            </h1>
            <p className="mt-1 text-xs italic text-gray-300">Doctor Panel</p>
          </div>

          <nav className="px-4 py-6 space-y-2">
            {DoctorMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-gray-900 shadow-inner"
                      : "hover:bg-purple-600 hover:shadow-lg"
                  }`}
                >
                  <span className="mr-3 text-lg">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}

            <div
              onClick={handleLogout}
              className="flex items-center p-3 mt-4 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🚪</span> Logout
            </div>
          </nav>

          <div className="p-4 text-sm text-center border-t border-purple-600">
            © 2025 Swāthya
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b shadow-sm bg-gradient-to-r from-white to-gray-100">
          <div className="text-xl font-semibold text-gray-700 lg:hidden">☰</div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Date & Quote */}
            <div className="flex-col hidden ml-2 text-sm text-right md:flex">
              <span className="font-semibold text-gray-500">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-base italic text-purple-600">
                {quotes[quoteIndex]}
              </span>
            </div>

            {/* View Appointments Button + Bell */}
            <Link
              to="/doctor-dashboard/appointments"
              className="items-center hidden gap-2 px-3 py-1 text-xs font-medium text-white transition bg-indigo-500 rounded-full shadow md:flex hover:bg-indigo-600"
            >
              <Bell className="w-4 h-4" />
              {appointmentCount > 0 && (
                <span className="relative inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow ring-2 ring-white">
                  {appointmentCount}
                </span>
              )}
              View Appointments
            </Link>

            {/* Profile */}
            <Link
              to="/doctor-dashboard/profile"
              className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
            >
              Hi, {doctorName}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
