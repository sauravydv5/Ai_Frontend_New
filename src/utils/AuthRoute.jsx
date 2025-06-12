// Components/AuthRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children, role }) => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const patient = JSON.parse(localStorage.getItem("patientInfo"));

  if (role === "doctor" && !doctor)
    return <Navigate to="/doctorlogin" replace />;
  if (role === "patient" && !patient)
    return <Navigate to="/patientlogin" replace />;

  return children;
};

export default AuthRoute;
