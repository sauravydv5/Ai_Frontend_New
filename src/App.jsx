import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import DoctorRegister from "./Pages/Doctor/DoctorRegister";
import Dashboard from "./Pages/Doctor/Dashboard";

import PatientRegister from "./Pages/Patient/PatientRegister";
import PatientLogin from "./Pages/Patient/PatientLogin";
import ApplyAsDoctor from "./Pages/Doctor/ApplyAsDoctor";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import DoctorList from "./Pages/Patient/DoctorList";
import BookAppointment from "./Pages/Patient/AppointmetBooking";
import SeeAppointmentList from "./Pages/Doctor/SeeAppointmetList";
import MyAppointments from "./Pages/Patient/MyAppointment";
import ProfileView from "./Pages/Doctor/ProfileView";
import DoctorDiagnosisForm from "./Pages/Doctor/DoctorDiagnosisForm";
import PatientDiagnosisList from "./Pages/Patient/PatientDiagnosisList";
import ChatBot from "./Pages/Patient/ChatBot";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/doctoregister" element={<DoctorRegister />} />
        <Route path="/Doctor-dashboard" element={<Dashboard />} />
        <Route path="/apply-doctor" element={<ApplyAsDoctor />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/patientregister" element={<PatientRegister />} />
        <Route path="/Patient-dashboard" element={<PatientDashboard />} />
        <Route path="/Doctor-list" element={<DoctorList />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/seeappointmentlist" element={<SeeAppointmentList />} />
        <Route path="/myappointemet" element={<MyAppointments />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/doctordiagosisform" element={<DoctorDiagnosisForm />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route
          path="/patientdiagosisresult"
          element={<PatientDiagnosisList />}
        />
      </Routes>
    </>
  );
};

export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Homepage from "./Pages/Homepage";
// import DoctorLogin from "./Pages/Doctor/DoctorLogin";
// import DoctorRegister from "./Pages/Doctor/DoctorRegister";
// import Dashboard from "./Pages/Doctor/Dashboard";

// import PatientRegister from "./Pages/Patient/PatientRegister";
// import PatientLogin from "./Pages/Patient/PatientLogin";
// import ApplyAsDoctor from "./Pages/Doctor/ApplyAsDoctor";
// import PatientDashboard from "./Pages/Patient/PatientDashboard";
// import DoctorList from "./Pages/Patient/DoctorList";
// import BookAppointment from "./Pages/Patient/AppointmetBooking";
// import SeeAppointmentList from "./Pages/Doctor/SeeAppointmetList";
// import MyAppointments from "./Pages/Patient/MyAppointment";
// import ProfileView from "./Pages/Doctor/ProfileView";
// import DoctorDiagnosisForm from "./Pages/Doctor/DoctorDiagnosisForm";
// import PatientDiagnosisList from "./Pages/Patient/PatientDiagnosisList";

// import ProtectedRoute from "./utils/ProtectedRoute";
// import PublicRoute from "./utils/PublicRoute";

// const App = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route
//         path="/"
//         element={
//           <PublicRoute>
//             <Homepage />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/doctorlogin"
//         element={
//           <PublicRoute>
//             <DoctorLogin />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/doctoregister"
//         element={
//           <PublicRoute>
//             <DoctorRegister />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/patientlogin"
//         element={
//           <PublicRoute>
//             <PatientLogin />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/patientregister"
//         element={
//           <PublicRoute>
//             <PatientRegister />
//           </PublicRoute>
//         }
//       />

//       {/* Doctor Protected Routes */}
//       <Route
//         path="/Doctor-dashboard"
//         element={
//           <ProtectedRoute role="doctor">
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/apply-doctor"
//         element={
//           <ProtectedRoute role="doctor">
//             <ApplyAsDoctor />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/seeappointmentlist"
//         element={
//           <ProtectedRoute role="doctor">
//             <SeeAppointmentList />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profileview"
//         element={
//           <ProtectedRoute role="doctor">
//             <ProfileView />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/doctordiagosisform"
//         element={
//           <ProtectedRoute role="doctor">
//             <DoctorDiagnosisForm />
//           </ProtectedRoute>
//         }
//       />

//       {/* Patient Protected Routes */}
//       <Route
//         path="/Patient-dashboard"
//         element={
//           <ProtectedRoute role="patient">
//             <PatientDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/Doctor-list"
//         element={
//           <ProtectedRoute role="patient">
//             <DoctorList />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/book-appointment"
//         element={
//           <ProtectedRoute role="patient">
//             <BookAppointment />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/myappointemet"
//         element={
//           <ProtectedRoute role="patient">
//             <MyAppointments />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/patientdiagosisresult"
//         element={
//           <ProtectedRoute role="patient">
//             <PatientDiagnosisList />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default App;
