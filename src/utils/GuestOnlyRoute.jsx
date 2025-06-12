// Components/GuestOnlyRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const GuestOnlyRoute = ({ children }) => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const patient = JSON.parse(localStorage.getItem("patientInfo"));

  if (doctor) return <Navigate to="/doctor-dashboard" replace />;
  if (patient) return <Navigate to="/patient-dashboard" replace />;

  return children;
};

export default GuestOnlyRoute;
