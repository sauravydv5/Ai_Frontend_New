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
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);

    const timeInterval = setInterval(() => {
      setCurrentDateTime(
        new Date().toLocaleString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 60000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const appointmentCount = 2;

  return (
    <div className="flex h-screen font-sans bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 text-white shadow-xl bg-gradient-to-b from-sky-800 to-cyan-700">
        <div className="flex flex-col justify-between h-full">
          <div className="py-6 text-center border-b border-cyan-600">
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-200 via-sky-300 to-white bg-clip-text drop-shadow-md">
              Swāthya AI
            </h1>
            <p className="mt-1 text-xs italic text-blue-100">Doctor Panel</p>
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
                      : "hover:bg-cyan-600 hover:shadow-lg"
                  }`}
                >
                  <span className="mr-3 text-lg">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}

            <div
              onClick={handleLogout}
              className="flex items-center p-3 mt-4 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer hover:bg-rose-600 hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🚪</span> Logout
            </div>
          </nav>

          <div className="p-4 text-sm text-center border-t border-cyan-600">
            © 2025 Swāthya
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b shadow bg-gradient-to-r from-sky-100 to-blue-200">
          <div className="text-xl font-semibold text-gray-700 lg:hidden">☰</div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Date + Time & Quote */}
            <div className="flex-col hidden ml-2 text-sm text-right md:flex">
              <span className="font-semibold text-gray-700">
                {currentDateTime}
              </span>
              <span className="text-base italic text-cyan-700 font-medium">
                {quotes[quoteIndex]}
              </span>
            </div>

            {/* View Appointments Button */}
            <Link
              to="/doctor-dashboard/appointments"
              className="items-center hidden gap-2 px-3 py-1 text-xs font-medium text-white transition bg-blue-500 rounded-full shadow md:flex hover:bg-blue-600"
            >
              <Bell className="w-4 h-4" />
              {appointmentCount > 0 && (
                <span className="relative inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-rose-500 rounded-full shadow ring-2 ring-white">
                  {appointmentCount}
                </span>
              )}
              View Appointments
            </Link>

            {/* Profile Link */}
            <Link
              to="/doctor-dashboard/profile"
              className="px-4 py-1 text-sm font-medium text-blue-700 transition bg-white border border-blue-300 rounded-full shadow hover:bg-blue-50"
            >
              Hi, {doctorName}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-blue-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
