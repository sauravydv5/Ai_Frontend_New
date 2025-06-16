import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<div>
  <Toaster />
</div>;

import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import DoctorRegister from "./Pages/Doctor/DoctorRegister";

import DoctorProfileEdit from "./Pages/Doctor/DoctorProfileEdit";
import PatientRegister from "./Pages/Patient/PatientRegister";
import PatientLogin from "./Pages/Patient/PatientLogin";

import PatientDashboard from "./Pages/Patient/PatientDashboard";
import DoctorList from "./Pages/Patient/DoctorList";
import BookAppointment from "./Pages/Patient/AppointmetBooking";
import SeeAppointmentList from "./Pages/Doctor/SeeAppointmetList";
import MyAppointments from "./Pages/Patient/MyAppointment";
import ProfileView from "./Pages/Doctor/DoctorProfile";
import DoctorDiagnosisForm from "./Pages/Doctor/DoctorDiagnosisForm";
import PatientDiagnosisList from "./Pages/Patient/PatientDiagnosisList";
import ChatBot from "./Pages/Patient/ChatBot";
import DoctorHistory from "./Pages/Doctor/HistoryFeedback";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
import Home from "./Pages/Patient/Home";
import Home1 from "./Pages/Doctor/Home1";

import AuthRoute from "./utils/AuthRoute";
import GuestOnlyRoute from "./utils/GuestOnlyRoute";
import EditPatientProfile from "./Pages/Patient/EditPatientProfile";
import PatientProfileView from "./Pages/Patient/PatientProfileView";

import DoctorProfileById from "./Pages/Doctor/DoctorProfileById";

const App = () => {
  return (
    <Routes>
      {/* Public homepage */}
      <Route
        path="/"
        element={
          <GuestOnlyRoute>
            <Homepage />
          </GuestOnlyRoute>
        }
      />

      {/* Guest only auth routes */}
      <Route
        path="/doctorlogin"
        element={
          <GuestOnlyRoute>
            <DoctorLogin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/doctoregister"
        element={
          <GuestOnlyRoute>
            <DoctorRegister />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/patientlogin"
        element={
          <GuestOnlyRoute>
            <PatientLogin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/patientregister"
        element={
          <GuestOnlyRoute>
            <PatientRegister />
          </GuestOnlyRoute>
        }
      />

      {/* Patient Dashboard */}
      <Route
        path="/patient-dashboard"
        element={
          <AuthRoute role="patient">
            <PatientDashboard />
          </AuthRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="doctor-list" element={<DoctorList />} />
        <Route path="editprofile" element={<EditPatientProfile />} />
        <Route path="profileview" element={<PatientProfileView />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="myappointemet" element={<MyAppointments />} />
        <Route
          path="patientdiagosisresult"
          element={<PatientDiagnosisList />}
        />
      </Route>

      {/* Doctor Dashboard */}
      <Route
        path="/doctor-dashboard"
        element={
          <AuthRoute role="doctor">
            <DoctorDashboard />
          </AuthRoute>
        }
      >
        <Route index element={<Home1 />} />
        <Route path="appointments" element={<SeeAppointmentList />} />
        <Route path="edit-profile" element={<DoctorProfileEdit />} />
        <Route path="add-diagnosis" element={<DoctorDiagnosisForm />} />
        <Route path="history" element={<DoctorHistory />} />
        <Route path="profile" element={<ProfileView />} />
        {/* ❌ Removed doctor-profile from here */}
      </Route>

      {/* ✅ Moved outside dashboard: Doctor profile view by ID */}
      <Route
        path="/doctor-profile/:id"
        element={
          <AuthRoute role="patient">
            <DoctorProfileById />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;

// const App = () => {
//   return (
//     <Routes>
//       {/* Public homepage should be accessible only if not logged in */}
//       <Route
//         path="/"
//         element={
//           <GuestOnlyRoute>
//             <Homepage />
//           </GuestOnlyRoute>
//         }
//       />

//       {/* Guest only auth routes */}
//       <Route
//         path="/doctorlogin"
//         element={
//           <GuestOnlyRoute>
//             <DoctorLogin />
//           </GuestOnlyRoute>
//         }
//       />
//       <Route
//         path="/doctoregister"
//         element={
//           <GuestOnlyRoute>
//             <DoctorRegister />
//           </GuestOnlyRoute>
//         }
//       />
//       <Route
//         path="/patientlogin"
//         element={
//           <GuestOnlyRoute>
//             <PatientLogin />
//           </GuestOnlyRoute>
//         }
//       />
//       <Route
//         path="/patientregister"
//         element={
//           <GuestOnlyRoute>
//             <PatientRegister />
//           </GuestOnlyRoute>
//         }
//       />

//       {/* Patient Dashboard */}
//       <Route
//         path="/patient-dashboard"
//         element={
//           <AuthRoute role="patient">
//             <PatientDashboard />
//           </AuthRoute>
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="chatbot" element={<ChatBot />} />
//         <Route path="doctor-list" element={<DoctorList />} />
//         <Route path="editprofile" element={<EditPatientProfile />} />
//         <Route path="profileview" element={<PatientProfileView />} />
//         <Route path="book-appointment" element={<BookAppointment />} />
//         <Route path="myappointemet" element={<MyAppointments />} />
//         <Route
//           path="patientdiagosisresult"
//           element={<PatientDiagnosisList />}
//         />
//       </Route>

//       {/* Doctor Dashboard */}
//       <Route
//         path="/doctor-dashboard"
//         element={
//           <AuthRoute role="doctor">
//             <DoctorDashboard />
//           </AuthRoute>
//         }
//       >
//         <Route index element={<Home1 />} />
//         <Route path="appointments" element={<SeeAppointmentList />} />
//         <Route path="edit-profile" element={<DoctorProfileEdit />} />
//         <Route path="add-diagnosis" element={<DoctorDiagnosisForm />} />
//         <Route path="history" element={<DoctorHistory />} />
//         <Route path="profile" element={<ProfileView />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;
