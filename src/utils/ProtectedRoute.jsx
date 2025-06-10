import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const doctor = localStorage.getItem("doctor");
  const patient = localStorage.getItem("patient");

  if (!token) return <Navigate to="/" />;

  // Role-specific access
  if (role === "doctor" && !doctor) return <Navigate to="/doctorlogin" />;
  if (role === "patient" && !patient) return <Navigate to="/patientlogin" />;

  return children;
};

export default ProtectedRoute;
