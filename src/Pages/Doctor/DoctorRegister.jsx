import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { Loader2 } from "lucide-react";

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    registrationNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, emailId, password, registrationNumber } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !emailId ||
      !password ||
      !registrationNumber
    ) {
      setError("⚠️ All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(BASE_URL + "/doctor/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.message === "Doctor registered successfully") {
        alert("✅ Doctor registered successfully!");
        navigate("/doctorlogin");
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-200 via-white to-indigo-100">
      <div className="w-full max-w-md p-8 border border-blue-100 shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl">
        <h2 className="mb-6 text-3xl font-extrabold text-center text-blue-700 drop-shadow">
          Doctor Registration
        </h2>

        {error && (
          <p className="mb-4 text-sm font-semibold text-center text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            {
              name: "registrationNumber",
              label: "Registration Number",
              type: "text",
            },
            { name: "emailId", label: "Email Address", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 transition-all duration-200 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:scale-[1.01]"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/doctorlogin"
            className="font-semibold text-blue-600 transition hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorRegister;
