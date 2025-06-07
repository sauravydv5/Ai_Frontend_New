import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { showLoading, hideLoading } from "../redux/feature/alertSlice";

const DoctorRegister = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/doctor/signup",
        formData
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert("Registered successfully!");
        navigate("/doctorlogin");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/doctorlogin" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorRegister;
