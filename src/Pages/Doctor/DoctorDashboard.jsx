// // // import React from "react";
// // // import { Link, useLocation, useNavigate } from "react-router-dom";
// // // import { Bell } from "lucide-react";
// // // import DoctorMenu from "../../Components/DoctorSidebar";

// // // const Dashboard = ({ children }) => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const doctor = JSON.parse(localStorage.getItem("doctor"));
// // //   const doctorName = doctor?.firstName || "Doctor";

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("doctor");
// // //     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// // //     navigate("/");
// // //   };

// // //   return (
// // //     <div className="flex h-screen font-sans bg-gray-100">
// // //       {/* Sidebar */}
// // //       <aside className="w-64 text-white shadow-lg bg-gradient-to-b from-indigo-900 to-purple-700">
// // //         <div className="flex flex-col justify-between h-full">
// // //           {/* Logo */}
// // //           <div className="py-6 text-center border-b border-purple-600">
// // //             <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
// // //               Swāthya AI
// // //             </h1>
// // //             <p className="mt-1 text-xs italic text-gray-300">
// // //               Your Health Companion
// // //             </p>
// // //           </div>

// // //           {/* Menu Items */}
// // //           <nav className="px-4 py-6 space-y-2">
// // //             {DoctorMenu.map((menu, index) => {
// // //               const isActive = location.pathname === menu.path;

// // //               return (
// // //                 <Link
// // //                   key={index}
// // //                   to={menu.path}
// // //                   className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
// // //                     isActive
// // //                       ? "bg-white text-gray-900 shadow-inner"
// // //                       : "hover:bg-purple-600 hover:shadow-lg"
// // //                   }`}
// // //                 >
// // //                   <span className="mr-3 text-lg">{menu.icon}</span>
// // //                   {menu.name}
// // //                 </Link>
// // //               );
// // //             })}

// // //             {/* Logout Button */}
// // //             <div
// // //               onClick={handleLogout}
// // //               className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
// // //             >
// // //               <span className="mr-3 text-lg">🚪</span>
// // //               Logout
// // //             </div>
// // //           </nav>

// // //           {/* Footer */}
// // //           <div className="p-4 text-sm text-center border-t border-purple-600">
// // //             © 2025 Swāthya
// // //           </div>
// // //         </div>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <div className="flex flex-col flex-1 overflow-hidden">
// // //         {/* Header */}
// // //         <header className="flex items-center justify-between h-16 px-4 border-b shadow-sm bg-gradient-to-r from-white to-gray-50">
// // //           <div className="text-2xl font-semibold text-gray-700 lg:hidden">
// // //             ☰
// // //           </div>

// // //           <div className="flex items-center gap-4 ml-auto">
// // //             {/* Notification Bell */}
// // //             <div className="relative p-2 transition bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200">
// // //               <Bell className="w-5 h-5 text-gray-700" />
// // //               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
// // //             </div>

// // //             {/* ✅ Display Doctor's Name from LocalStorage */}
// // //             <Link
// // //               to="/profile"
// // //               className="px-3 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
// // //             >
// // //               Hi, {doctorName}
// // //             </Link>
// // //           </div>
// // //         </header>

// // //         {/* Page Content */}
// // //         <main className="flex-1 p-6 overflow-auto bg-gray-50">
// // //           {children || "Hello World"}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // import React from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { Bell } from "lucide-react";
// // import DoctorMenu from "../../Components/DoctorSidebar";

// // const Dashboard = ({ children }) => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const doctor = JSON.parse(localStorage.getItem("doctor"));
// //   const doctorName = doctor?.firstName || "Doctor";

// //   const handleLogout = () => {
// //     // Optional: confirm dialog
// //     if (window.confirm("Are you sure you want to logout?")) {
// //       // Clear local storage & token cookie
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("doctor");
// //       document.cookie =
// //         "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// //       navigate("/"); // Redirect to homepage
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen font-sans bg-gray-100">
// //       {/* Sidebar */}
// //       <aside className="w-64 text-white shadow-lg bg-gradient-to-b from-indigo-900 to-purple-700">
// //         <div className="flex flex-col justify-between h-full">
// //           {/* Logo */}
// //           <div className="py-6 text-center border-b border-purple-600">
// //             <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
// //               Swāthya AI
// //             </h1>
// //             <p className="mt-1 text-xs italic text-gray-300">
// //               Your Health Companion
// //             </p>
// //           </div>

// //           {/* Menu Items */}
// //           <nav className="px-4 py-6 space-y-2">
// //             {DoctorMenu.map((menu, index) => {
// //               const isActive = location.pathname === menu.path;
// //               return (
// //                 <Link
// //                   key={index}
// //                   to={menu.path}
// //                   className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
// //                     isActive
// //                       ? "bg-white text-gray-900 shadow-inner"
// //                       : "hover:bg-purple-600 hover:shadow-lg"
// //                   }`}
// //                 >
// //                   <span className="mr-3 text-lg">{menu.icon}</span>
// //                   {menu.name}
// //                 </Link>
// //               );
// //             })}

// //             {/* Logout Button */}
// //             <div
// //               onClick={handleLogout}
// //               className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
// //             >
// //               <span className="mr-3 text-lg">🚪</span>
// //               Logout
// //             </div>
// //           </nav>

// //           {/* Footer */}
// //           <div className="p-4 text-sm text-center border-t border-purple-600">
// //             © 2025 Swāthya
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="flex flex-col flex-1 overflow-hidden">
// //         {/* Header */}
// //         <header className="flex items-center justify-between h-16 px-4 border-b shadow-sm bg-gradient-to-r from-white to-gray-50">
// //           <div className="text-2xl font-semibold text-gray-700 lg:hidden">
// //             ☰
// //           </div>

// //           <div className="flex items-center gap-4 ml-auto">
// //             {/* Notification Bell */}
// //             <div className="relative p-2 transition bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200">
// //               <Bell className="w-5 h-5 text-gray-700" />
// //               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
// //             </div>

// //             {/* Doctor Name */}
// //             <Link
// //               to="/profile"
// //               className="px-3 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
// //             >
// //               Hi, {doctorName}
// //             </Link>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 p-6 overflow-auto bg-gray-50">
// //           {children || "Hello World"}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Bell } from "lucide-react";
// import DoctorMenu from "../../Components/DoctorSidebar";

// const Dashboard = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const doctor = JSON.parse(localStorage.getItem("doctor"));
//   const doctorName = doctor?.firstName || "Doctor";

//   const handleLogout = () => {
//     alert("Logging out...");

//     // Clear doctor data and token
//     localStorage.removeItem("doctor");
//     localStorage.removeItem("token");
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     // Force navigation to homepage
//     navigate("/", { replace: true });

//     // Optional: reload to reset all state
//     window.location.reload();
//   };

//   return (
//     <div className="flex h-screen font-sans bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 text-white shadow-lg bg-gradient-to-b from-indigo-900 to-purple-700">
//         <div className="flex flex-col justify-between h-full">
//           {/* Logo */}
//           <div className="py-6 text-center border-b border-purple-600">
//             <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-md">
//               Swāthya AI
//             </h1>
//             <p className="mt-1 text-xs italic text-gray-300">
//               Your Health Companion
//             </p>
//           </div>

//           {/* Menu Items */}
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
//                 >
//                   <span className="mr-3 text-lg">{menu.icon}</span>
//                   {menu.name}
//                 </Link>
//               );
//             })}

//             {/* Logout Button */}
//             <div
//               onClick={handleLogout}
//               className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
//             >
//               <span className="mr-3 text-lg">🚪</span>
//               Logout
//             </div>
//           </nav>

//           {/* Footer */}
//           <div className="p-4 text-sm text-center border-t border-purple-600">
//             © 2025 Swāthya
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center justify-between h-16 px-4 border-b shadow-sm bg-gradient-to-r from-white to-gray-50">
//           <div className="text-2xl font-semibold text-gray-700 lg:hidden">
//             ☰
//           </div>

//           <div className="flex items-center gap-4 ml-auto">
//             {/* Notification Bell */}
//             <div className="relative p-2 transition bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200">
//               <Bell className="w-5 h-5 text-gray-700" />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
//             </div>

//             {/* Doctor Name */}
//             <Link
//               to="/profileview"
//               className="px-3 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
//             >
//               Hi, {doctorName}
//             </Link>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-auto bg-gray-50">
//           {children || "Welcome to Doctor Dashboard"}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import DoctorMenu from "../../Components/DoctorSidebar";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorName = doctor?.firstName || "Doctor";

  const handleLogout = () => {
    alert("Logging out...");
    localStorage.removeItem("doctor");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
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
              className="flex items-center w-full p-3 mt-4 text-sm font-medium text-left transition-all duration-300 rounded-lg cursor-pointer hover:bg-red-600 hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🚪</span>
              Logout
            </div>
          </nav>

          <div className="p-4 text-sm text-center border-t border-purple-600">
            © 2025 Swāthya
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 border-b shadow-sm bg-gradient-to-r from-white to-gray-50">
          <div className="text-2xl font-semibold text-gray-700 lg:hidden">
            ☰
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative p-2 transition bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>

            <Link
              to="/doctor-dashboard/profile"
              className="px-3 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
            >
              Hi, {doctorName}
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
