import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    if (!identifier || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/patient/login", formData);
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("patientInfo", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/Patient-dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-teal-100 via-white to-teal-200">
      <div className="w-full max-w-md p-8 bg-white border border-teal-100 shadow-2xl rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
          Patient Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email or username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/patientregister"
            className="font-medium text-teal-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
