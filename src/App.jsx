import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./Components/Navbar";

// Pages
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
import EditPatientProfile from "./Pages/Patient/EditPatientProfile";
import PatientProfileView from "./Pages/Patient/PatientProfileView";
import DoctorProfileById from "./Pages/Doctor/DoctorProfileById";
import SymptomChecker from "./Pages/Patient/SymptomChecker";
import AiMedco from "./Pages/Doctor/AiMedco";
import MoodAnalyzer from "./Pages/Patient/MoodAnalyzer";

// Auth Utils
import AuthRoute from "./utils/AuthRoute";
import GuestOnlyRoute from "./utils/GuestOnlyRoute";
import AboutPage from "./Components/AboutPage";
import BlogPage from "./Components/BlogPage";

const App = () => {
  return (
    <>
      {/* 🌟 Global Toast Container */}
      <ToastContainer
        position="top-center" // 👈 Show from top center
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* ✅ All Routes */}
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
        <Route
          path="/aboutpage"
          element={
            <GuestOnlyRoute>
              <AboutPage />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/blogpage"
          element={
            <GuestOnlyRoute>
              <BlogPage />
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
          <Route path="symptomcheak" element={<SymptomChecker />} />
          <Route path="cheakyourmood" element={<MoodAnalyzer />} />
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
          <Route path="aimedicine" element={<AiMedco />} />
        </Route>

        {/* Doctor profile view by ID (outside dashboard) */}
        <Route
          path="/doctor-profile/:id"
          element={
            <AuthRoute role="patient">
              <DoctorProfileById />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
