import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, emailId, password } = formData;
    if (!firstName || !lastName || !username || !emailId || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(BASE_URL + "/patient/signup", formData);
      setLoading(false);

      if (res.data.message === "Patient registered successfully") {
        toast.success("🎉 Registered successfully!");
        setTimeout(() => navigate("/patientlogin"), 2000);
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-green-100 to-teal-200">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
          Patient Registration
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "username", label: "Username", type: "text" },
            { name: "emailId", label: "Email Address", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-medium text-white rounded-md transition duration-300 ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/patientlogin" className="text-teal-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default PatientRegister;
