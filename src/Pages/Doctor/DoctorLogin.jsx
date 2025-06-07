import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { showLoading, hideLoading } from "../redux/feature/alertSlice";
// import { useDispatch } from "react-redux";

const DoctorLogin = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    emailId: "saurav@doc.com",
    password: "123456",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emailId, password } = formData;
    if (!emailId || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/doctor/login",
        formData,
        {
          withCredentials: true, // for cookies
        }
      );
      // dispatch(hideLoading());

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/Doctor-dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      // dispatch(hideLoading());
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
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
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
