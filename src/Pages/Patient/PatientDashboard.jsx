// // import React, { useEffect, useState } from "react";
// // import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
// // import axios from "axios";
// // import PatientMenu from "../../Components/PatientSidebar";
// // import { BASE_URL } from "../../utils/constant";

// // const PatientDashboard = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [patient, setPatient] = useState(null); // ✅ State for patient data

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("patientInfo");
// //     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   const quotes = [
// //     "Your health is your wealth 💚",
// //     "Stay hydrated, stay energized 💧",
// //     "Mental health is just as important 🧠",
// //     "A healthy lifestyle is a journey 🚶‍♂️",
// //     "Prevention is powerful 🛡️",
// //     "Eat well, feel well 🍎",
// //     "Wellness begins from within 🌱",
// //     "Sleep is the best meditation 💤",
// //   ];
// //   const [quoteIndex, setQuoteIndex] = useState(0);

// //   // ✅ Fetch patient data from backend
// //   useEffect(() => {
// //     const fetchPatient = async () => {
// //       try {
// //         const response = await axios.get(`${BASE_URL}/patient/profile/view`, {
// //           withCredentials: true, // To send cookies (JWT)
// //         });
// //         if (response.data.success) {
// //           setPatient(response.data.data);
// //         } else {
// //           console.error("Patient data fetch failed");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching patient info", err);
// //       }
// //     };

// //     fetchPatient();
// //   }, []);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setQuoteIndex((prev) => (prev + 1) % quotes.length);
// //     }, 15000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="flex h-screen font-sans bg-gray-100">
// //       {/* Sidebar */}
// //       <aside
// //         className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gradient-to-b from-green-700 to-teal-900 text-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
// //           sidebarOpen ? "translate-x-0" : "-translate-x-full"
// //         }`}
// //       >
// //         <div className="flex flex-col justify-between h-full">
// //           {/* Logo */}
// //           <div className="py-6 text-center border-b border-teal-600">
// //             <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-green-400 via-teal-300 to-blue-500 bg-clip-text drop-shadow-md">
// //               Swāthya AI
// //             </h1>
// //             <p className="mt-1 text-xs italic text-gray-300">
// //               Your Health Companion
// //             </p>
// //           </div>

// //           {/* Menu */}
// //           <nav className="px-4 py-6 space-y-2">
// //             {PatientMenu.map((menu, index) => {
// //               const isActive = location.pathname === menu.path;
// //               return (
// //                 <Link
// //                   key={index}
// //                   to={menu.path}
// //                   className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
// //                     isActive
// //                       ? "bg-white text-gray-900 shadow-inner"
// //                       : "hover:bg-teal-600 hover:shadow-lg"
// //                   }`}
// //                   onClick={() => setSidebarOpen(false)}
// //                 >
// //                   <span className="mr-3 text-lg">{menu.icon}</span>
// //                   {menu.name}
// //                 </Link>
// //               );
// //             })}

// //             {/* Logout */}
// //             <div
// //               onClick={handleLogout}
// //               className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
// //             >
// //               <span className="mr-3 text-lg">🚪</span> Logout
// //             </div>
// //           </nav>

// //           {/* Footer */}
// //           <div className="p-4 text-sm text-center border-t border-teal-600">
// //             © 2025 Swāthya
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Overlay for mobile */}
// //       {sidebarOpen && (
// //         <div
// //           className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex flex-col flex-1 overflow-hidden">
// //         {/* Header */}
// //         <header className="flex items-center justify-between h-16 px-4 shadow-sm bg-gradient-to-r from-white to-gray-100 md:px-6">
// //           <button
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //             className="text-2xl text-gray-600 md:hidden"
// //           >
// //             ☰
// //           </button>

// //           <div className="items-center hidden gap-4 ml-auto md:flex">
// //             <div className="flex-col hidden text-sm text-right md:flex">
// //               <span className="font-semibold text-gray-500">
// //                 {new Date().toLocaleDateString("en-IN", {
// //                   weekday: "short",
// //                   year: "numeric",
// //                   month: "short",
// //                   day: "numeric",
// //                 })}
// //               </span>
// //               <span className="text-base italic text-teal-600">
// //                 {quotes[quoteIndex]}
// //               </span>
// //             </div>

// //             {/* Profile Button */}
// //             <Link
// //               to="/patient-dashboard/profileview"
// //               className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
// //             >
// //               Hi, {patient?.firstName || "Patient"}
// //             </Link>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 p-4 overflow-auto md:p-6 bg-gray-50">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PatientDashboard;

// // NEWCODE

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
// import PatientMenu from "../../Components/PatientSidebar";
// import axiosInstance from "../../utils/axiosInstance";

// const PatientDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [patient, setPatient] = useState(null);
//   const quotes = [
//     /* same as before */
//   ];
//   const [quoteIndex, setQuoteIndex] = useState(0);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("patientInfo");
//     navigate("/");
//     window.location.reload();
//   };

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const response = await axiosInstance.get("/patient/profile/view");
//         if (response.data.success) {
//           setPatient(response.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching patient info", err);
//       }
//     };
//     fetchPatient();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteIndex((prev) => (prev + 1) % quotes.length);
//     }, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex h-screen font-sans bg-gray-100">
//       {/* ...Sidebar + Header code remains unchanged */}
//       <main className="flex-1 p-4 overflow-auto md:p-6 bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default PatientDashboard;

// NNNEEWWW

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // ✅ Secure instance
import PatientMenu from "../../Components/PatientSidebar";

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patient, setPatient] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientInfo");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosInstance.get("/patient/profile/view");
        if (response.data.success) {
          setPatient(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching patient info", err);
      }
    };
    fetchPatient();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gradient-to-b from-green-700 to-teal-900 text-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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

      {/* Overlay for mobile */}
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
              <span className="text-base italic text-teal-600">
                {quotes[quoteIndex]}
              </span>
            </div>

            {/* Profile Button */}
            <Link
              to="/patient-dashboard/profileview"
              className="px-4 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
            >
              Hi, {patient?.firstName || "Patient"}
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

export default PatientDashboard;
