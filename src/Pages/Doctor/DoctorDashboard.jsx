// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
// import DoctorMenu from "../../Components/DoctorSidebar";

// const DoctorDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const doctor = JSON.parse(localStorage.getItem("doctor"));
//   const doctorName = doctor?.firstName || "Doctor";

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [quoteIndex, setQuoteIndex] = useState(0);

//   const quotes = [
//     "Health is wealth 💪",
//     "A calm mind brings inner strength ✨",
//     "Eat healthy, stay healthy 🍎",
//     "Prevention is better than cure 🩺",
//     "Good health is true wealth",
//     "Your body hears everything your mind says",
//     "Happiness is the highest form of health",
//     "Take care of your body, it’s the only place you have to live",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteIndex((prev) => (prev + 1) % quotes.length);
//     }, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("doctor");
//     localStorage.removeItem("token");
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <div className="flex h-screen font-sans bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gradient-to-b from-indigo-900 to-purple-700 text-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col justify-between h-full">
//           {/* Logo */}
//           <div className="py-6 text-center border-b border-purple-600">
//             <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
//               Swāthya AI
//             </h1>
//             <p className="mt-1 text-xs italic text-gray-300">Doctor Panel</p>
//           </div>

//           {/* Menu */}
//           <nav className="px-4 py-6 space-y-2">
//             {DoctorMenu.map((menu, index) => {
//               const isActive = location.pathname === menu.path;
//               return (
//                 <Link
//                   key={index}
//                   to={menu.path}
//                   className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-white text-gray-900 shadow-inner"
//                       : "hover:bg-purple-600 hover:shadow-lg"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <span className="mr-3 text-lg">{menu.icon}</span>
//                   {menu.name}
//                 </Link>
//               );
//             })}

//             {/* Logout */}
//             <div
//               onClick={handleLogout}
//               className="flex items-center p-3 mt-4 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
//             >
//               <span className="mr-3 text-lg">🚪</span> Logout
//             </div>
//           </nav>

//           {/* Footer */}
//           <div className="p-4 text-sm text-center border-t border-purple-600">
//             © 2025 Swāthya
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center justify-between h-16 px-4 shadow-sm bg-gradient-to-r from-white to-gray-100 md:px-6">
//           {/* Hamburger */}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-2xl text-gray-600 md:hidden"
//           >
//             ☰
//           </button>

//           {/* Date & Quote */}
//           <div className="items-center hidden gap-4 ml-auto md:flex">
//             <div className="flex-col hidden text-sm text-right md:flex">
//               <span className="font-semibold text-gray-500">
//                 {new Date().toLocaleDateString("en-IN", {
//                   weekday: "short",
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </span>
//               <span className="text-base italic text-purple-600">
//                 {quotes[quoteIndex]}
//               </span>
//             </div>

//             {/* View Appointments (Without Bell Icon & Count) */}
//             <Link
//               to="/doctor-dashboard/appointments"
//               className="px-3 py-1 text-xs font-medium text-white transition bg-indigo-500 rounded-full shadow hover:bg-indigo-600"
//             >
//               View Appointments
//             </Link>

//             {/* Profile */}
//             <Link
//               to="/doctor-dashboard/profile"
//               className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
//             >
//               Hi, {doctorName}
//             </Link>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-4 overflow-auto md:p-6 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import DoctorMenu from "../../Components/DoctorSidebar";
import { BASE_URL } from "../../utils/constant";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [doctor, setDoctor] = useState(null); // ✅ doctor info from API

  const quotes = [
    "Health is wealth 💪",
    "A calm mind brings inner strength ✨",
    "Eat healthy, stay healthy 🍎",
    "Prevention is better than cure 🩺",
    "Good health is true wealth",
    "Your body hears everything your mind says",
    "Happiness is the highest form of health",
    "Take care of your body, it’s the only place you have to live",
  ];

  // ✅ Fetch doctor data from backend
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctor/profile/view`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setDoctor(response.data.data);
        } else {
          console.error("Doctor data fetch failed");
        }
      } catch (error) {
        console.error("Error fetching doctor info", error);
      }
    };

    fetchDoctor();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   navigate("/");
  //   window.location.reload();
  // };

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gradient-to-b from-indigo-900 to-purple-700 text-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Logo */}
          <div className="py-6 text-center border-b border-purple-600">
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
              Swāthya AI
            </h1>
            <p className="mt-1 text-xs italic text-gray-300">Doctor Panel</p>
          </div>

          {/* Menu */}
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
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 text-lg">{menu.icon}</span>
                  {menu.name}
                </Link>
              );
            })}

            {/* Logout */}
            <div
              onClick={handleLogout}
              className="flex items-center p-3 mt-4 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🚪</span> Logout
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 text-sm text-center border-t border-purple-600">
            © 2025 Swāthya
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 shadow-sm bg-gradient-to-r from-white to-gray-100 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-600 md:hidden"
          >
            ☰
          </button>

          <div className="items-center hidden gap-4 ml-auto md:flex">
            <div className="flex-col hidden text-sm text-right md:flex">
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

            <Link
              to="/doctor-dashboard/appointments"
              className="px-3 py-1 text-xs font-medium text-white transition bg-indigo-500 rounded-full shadow hover:bg-indigo-600"
            >
              View Appointments
            </Link>

            <Link
              to="/doctor-dashboard/profile"
              className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
            >
              Hi, {doctor?.firstName || "Doctor"}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
