import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import DoctorRegister from "./Pages/Doctor/DoctorRegister";
// import Dashboard from "./Pages/Doctor/Dashboard";
import DoctorProfileEdit from "./Pages/Doctor/DoctorProfileEdit";
import PatientRegister from "./Pages/Patient/PatientRegister";
import PatientLogin from "./Pages/Patient/PatientLogin";

import PatientDashboard from "./Pages/Patient/PatientDashboard";
import DoctorList from "./Pages/Patient/DoctorList";
import BookAppointment from "./Pages/Patient/AppointmetBooking";
import SeeAppointmentList from "./Pages/Doctor/SeeAppointmetList";
import MyAppointments from "./Pages/Patient/MyAppointment";
import ProfileView from "./Pages/Doctor/ProfileView";
import DoctorDiagnosisForm from "./Pages/Doctor/DoctorDiagnosisForm";
import PatientDiagnosisList from "./Pages/Patient/PatientDiagnosisList";
import ChatBot from "./Pages/Patient/ChatBot";
import DoctorHistory from "./Pages/Doctor/HistoryFeedback";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/doctorlogin" element={<DoctorLogin />} />
//         <Route path="/doctoregister" element={<DoctorRegister />} />
//         <Route path="/Doctor-dashboard" element={<Dashboard />} />

//         <Route path="/patientlogin" element={<PatientLogin />} />
//         <Route path="/patientregister" element={<PatientRegister />} />
//         {/* <Route path="/Patient-dashboard" element={<PatientDashboard />} /> */}
//         <Route path="/patient-dashboard" element={<PatientDashboard />}>
//           <Route path="chatbot" element={<ChatBot />} />
//           <Route path="doctor-list" element={<DoctorList />} />
//           <Route path="book-appointment" element={<BookAppointment />} />
//           <Route path="myappointemet" element={<MyAppointments />} />
//           <Route
//             path="patientdiagosisresult"
//             element={<PatientDiagnosisList />}
//           />
//         </Route>

//         {/* <Route path="/Doctor-list" element={<DoctorList />} />
//         <Route path="/book-appointment" element={<BookAppointment />} /> */}
//         <Route path="/seeappointmentlist" element={<SeeAppointmentList />} />
//         <Route path="/myappointemet" element={<MyAppointments />} />
//         <Route path="/profileview" element={<ProfileView />} />
//         <Route path="/doctordiagosisform" element={<DoctorDiagnosisForm />} />
//         {/* <Route path="/chatbot" element={<ChatBot />} /> */}
//         {/* <Route
//           path="/patientdiagosisresult"
//           element={<PatientDiagnosisList />}
//         /> */}
//         <Route path="/doctoreditprofile" element={<DoctorProfileEdit />} />
//         <Route path="/history" element={<DoctorHistory />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./Components/Navbar";
// import Homepage from "./Pages/Homepage";

// // Auth
// import DoctorLogin from "./Pages/Doctor/DoctorLogin";
// import DoctorRegister from "./Pages/Doctor/DoctorRegister";
// import PatientLogin from "./Pages/Patient/PatientLogin";
// import PatientRegister from "./Pages/Patient/PatientRegister";

// // Doctor Dashboard
// import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
// import DoctorProfileEdit from "./Pages/Doctor/DoctorProfileEdit";
// import SeeAppointmentList from "./Pages/Doctor/SeeAppointmetList";
// import DoctorDiagnosisForm from "./Pages/Doctor/DoctorDiagnosisForm";
// import DoctorHistory from "./Pages/Doctor/HistoryFeedback";
// import ProfileView from "./Pages/Doctor/ProfileView";

// // Patient Dashboard
// import PatientDashboard from "./Pages/Patient/PatientDashboard";
// import DoctorList from "./Pages/Patient/DoctorList";
// import BookAppointment from "./Pages/Patient/AppointmetBooking";
// import MyAppointments from "./Pages/Patient/MyAppointment";
// import ChatBot from "./Pages/Patient/ChatBot";
// import PatientDiagnosisList from "./Pages/Patient/PatientDiagnosisList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Auth Routes */}
      <Route path="/doctorlogin" element={<DoctorLogin />} />
      <Route path="/doctoregister" element={<DoctorRegister />} />
      <Route path="/patientlogin" element={<PatientLogin />} />
      <Route path="/patientregister" element={<PatientRegister />} />

      {/* Patient Dashboard Layout */}
      <Route path="/patient-dashboard" element={<PatientDashboard />}>
        <Route index element={<ChatBot />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="doctor-list" element={<DoctorList />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="myappointemet" element={<MyAppointments />} />
        <Route
          path="patientdiagosisresult"
          element={<PatientDiagnosisList />}
        />
      </Route>

      {/* Doctor Dashboard Layout */}
      <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
        <Route index element={<div>Welcome to Doctor Dashboard</div>} />
        <Route path="appointments" element={<SeeAppointmentList />} />
        <Route path="edit-profile" element={<DoctorProfileEdit />} />
        <Route path="add-diagnosis" element={<DoctorDiagnosisForm />} />
        <Route path="history" element={<DoctorHistory />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Routes>
  );
};

export default App;
