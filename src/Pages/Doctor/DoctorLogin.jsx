import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { emailId, password } = formData;
    if (!emailId || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/doctor/login",
        formData,
        { withCredentials: true }
      );
      setLoading(false);

      if (res.data.token && res.data.doctor) {
        const currentDoctor = res.data.doctor;

        // Store token and current doctor
        // localStorage.setItem("token", res.data.token);
        localStorage.setItem("doctor", JSON.stringify(currentDoctor));

        // Update doctor list in localStorage
        const existingList =
          JSON.parse(localStorage.getItem("doctorList")) || [];

        const alreadyExists = existingList.some(
          (doc) => doc._id === currentDoctor._id
        );

        if (!alreadyExists) {
          existingList.push({
            _id: currentDoctor._id,
            firstName: currentDoctor.firstName,
            lastName: currentDoctor.lastName,
          });
          localStorage.setItem("doctorList", JSON.stringify(existingList));
        }

        alert("Login successful!");
        navigate("/Doctor-dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-indigo-100 to-blue-200">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Doctor Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Enter your email"
              required
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
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-medium text-white rounded-md transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/doctoregister" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
