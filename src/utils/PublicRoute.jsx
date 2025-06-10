import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const doctor = localStorage.getItem("doctor");
  const patient = localStorage.getItem("patient");

  if (token && doctor) return <Navigate to="/Doctor-dashboard" />;
  if (token && patient) return <Navigate to="/Patient-dashboard" />;

  return children;
};

export default PublicRoute;
