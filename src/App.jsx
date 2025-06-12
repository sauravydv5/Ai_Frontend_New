import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import DoctorRegister from "./Pages/Doctor/DoctorRegister";
import Dashboard from "./Pages/Doctor/Dashboard";
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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/doctoregister" element={<DoctorRegister />} />
        <Route path="/Doctor-dashboard" element={<Dashboard />} />

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
        <Route path="/doctoreditprofile" element={<DoctorProfileEdit />} />
        <Route path="/history" element={<DoctorHistory />} />
      </Routes>
    </>
  );
};

export default App;
