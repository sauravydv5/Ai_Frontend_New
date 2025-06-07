// import React from "react";
// import { Link } from "react-router-dom";
// import { Bell } from "lucide-react";
// import PatientDashboard from "../Doctor/Dashboard";

// const PatientDashboard = () => {
//   return (
//     <div className="flex h-screen font-sans bg-gray-100">
//       {/* Sidebar */}
//       <PatientSidebar />

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

//             {/* User Profile */}
//             <Link
//               to="/profile"
//               className="px-3 py-1 text-sm font-medium text-gray-700 transition bg-white border rounded-full shadow hover:bg-gray-100"
//             >
//               Patient
//             </Link>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-auto bg-gray-50">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
