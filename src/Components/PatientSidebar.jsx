const PatientMenu = [
  { name: "Home", icon: "🏠", path: "/patient-dashboard" },
  { name: "Edit Profile", icon: "🩺", path: "/patient-dashboard/editprofile" },

  {
    name: "Symptom Checker",
    icon: "🧬", // ya "", "📋", "👨‍⚕️", "🧑‍⚕️"
    path: "/patient-dashboard/symptomcheak",
  },

  { name: "AI Chatbot", icon: "🤖", path: "/patient-dashboard/chatbot" },
  // {
  //   name: "Mood Cheaker",
  //   icon: "🤖",
  //   path: "/patient-dashboard/cheakyourmood",
  // },
  { name: "Doctor List", icon: "👨‍⚕️", path: "/patient-dashboard/doctor-list" },
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
