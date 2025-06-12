// const DoctorMenu = [
//   { name: "Home", icon: "🏠", path: "/" },
//   { name: "Profile", icon: "🩺", path: "/doctoreditprofile" },
//   { name: "View Appointments", icon: "📅", path: "/seeappointmentlist" },
//   {
//     name: "Add Diagnosis & Prescription",
//     icon: "📝",
//     path: "/doctordiagosisform",
//   },
//   { name: "History & Feedback", icon: "📋", path: "/history" },
// ];

// export default DoctorMenu;

const DoctorMenu = [
  { name: "Home", icon: "🏠", path: "/doctor-dashboard" },
  { name: "Profile", icon: "🩺", path: "/doctor-dashboard/edit-profile" },
  {
    name: "View Appointments",
    icon: "📅",
    path: "/doctor-dashboard/appointments",
  },
  {
    name: "Add Diagnosis",
    icon: "📝",
    path: "/doctor-dashboard/add-diagnosis",
  },
  { name: "History & Feedback", icon: "📋", path: "/doctor-dashboard/history" },
];

export default DoctorMenu;
