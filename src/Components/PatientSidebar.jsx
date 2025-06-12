// const PatientMenu = [
//   { name: "Home", icon: "🏠", path: "/" },
//   { name: "AI Chatbot", icon: "🤖", path: "/chatbot" },
//   { name: "Doctor List", icon: "👨‍⚕️", path: "/doctor-list" },
//   // { name: "Symptom Checker", icon: "🩺", path: "/symptom-checker" },
//   { name: "Book Appointment", icon: "📅", path: "/book-appointment" },
//   { name: "My Appointment", icon: "📅", path: "/myappointemet" },
//   { name: "View Prescription", icon: "💊", path: "/patientdiagosisresult" },
// ];
// export default PatientMenu;

const PatientMenu = [
  { name: "Home", icon: "🏠", path: "/patient-dashboard" },
  { name: "AI Chatbot", icon: "🤖", path: "/patient-dashboard/chatbot" },
  { name: "Doctor List", icon: "👨‍⚕️", path: "/patient-dashboard/doctor-list" },
  // { name: "Symptom Checker", icon: "🩺", path: "/patient-dashboard/symptom-checker" },
  {
    name: "Book Appointment",
    icon: "📅",
    path: "/patient-dashboard/book-appointment",
  },
  {
    name: "My Appointment",
    icon: "📅",
    path: "/patient-dashboard/myappointemet",
  },
  {
    name: "View Prescription",
    icon: "💊",
    path: "/patient-dashboard/patientdiagosisresult",
  },
];
export default PatientMenu;
