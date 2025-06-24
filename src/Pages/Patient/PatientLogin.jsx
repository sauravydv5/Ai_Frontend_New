import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constant";
import "react-toastify/dist/ReactToastify.css";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setError("");

      const res = await axios.post(BASE_URL + "/patient/login", formData);

      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("patientInfo", JSON.stringify(res.data.user));
        toast.success("Login successful!");
        navigate("/Patient-dashboard");
      } else {
        setError(res.data.message || "Login failed");
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-teal-100 via-white to-teal-200">
      {/* ⏳ Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-white/40">
          <div className="border-4 border-teal-600 border-dashed rounded-full w-14 h-14 border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Login Card (No blur now) */}
      <div className="w-full max-w-md p-8 transition-all duration-300 bg-white shadow-2xl rounded-2xl">
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
            disabled={loading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition duration-300 ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
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
