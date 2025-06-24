import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "../../utils/constant";

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
      const res = await axios.post(`${BASE_URL}/doctor/login`, formData);
      setLoading(false);

      if (res.data.token && res.data.doctor) {
        localStorage.setItem("doctor", JSON.stringify(res.data.doctor));
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        navigate("/doctor-dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen px-4 bg-center bg-cover"
      style={{
        backgroundImage: `url('/images/doctor.jpg')`,
      }}
    >
      {/* ✅ Transparent Loader Over Form */}
      {loading && (
        <div className="absolute z-30 flex items-center justify-center w-full h-full bg-transparent pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-700">
              Logging in...
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-2xl bg-opacity-90 rounded-2xl sm:p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-800">
          Doctor Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
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
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Please wait..." : "Login"}
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
