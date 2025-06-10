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
        <Route
          path="/patientdiagosisresult"
          element={<PatientDiagnosisList />}
        />
      </Routes>
    </>
  );
};

export default App;
