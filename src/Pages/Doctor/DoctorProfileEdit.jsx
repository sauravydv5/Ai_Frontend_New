import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Loader2 } from "lucide-react";

const DoctorProfileEdit = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    speciality: "",
    clinicAddress: "",
    experienceYears: "",
    availableFrom: "",
    availableTo: "",
    photoUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const specialityOptions = [
    "Cardiologist",
    "Dermatologist",
    "General Physician",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic",
    "ENT",
    "Gynecologist",
  ];

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/doctor/profile/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const doctor = res.data.data;
        setFormData({
          _id: doctor._id || "",
          name: doctor.firstName || "",
          email: doctor.emailId || "",
          phone: doctor.phone || "",
          speciality: doctor.speciality || "",
          clinicAddress: doctor.clinicAddress || "",
          experienceYears: doctor.experienceYears || "",
          availableFrom: doctor.availableFrom || "",
          availableTo: doctor.availableTo || "",
          photoUrl: doctor.photoUrl || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch doctor profile:", err);
        setMessage("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}/doctor/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message || "✅ Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Update failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-sm text-indigo-700">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-4 py-10 mx-auto max-w-7xl lg:flex-row bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      {/* Form Panel */}
      <div className="w-full p-6 border border-indigo-100 shadow-2xl bg-white/80 backdrop-blur-md lg:w-2/3 rounded-3xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-indigo-700">
          Edit Profile
        </h2>
        {message && (
          <p
            className={`mb-4 text-center text-md font-semibold ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
          {[
            ["photoUrl", "Profile Photo URL", "url"],
            ["name", "Full Name", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "text"],
            ["clinicAddress", "Clinic Address", "text"],
            ["experienceYears", "Experience (Years)", "number"],
          ].map(([id, label, type]) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block mb-1 font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                required={id !== "photoUrl"}
              />
            </div>
          ))}

          {/* Speciality Dropdown */}
          <div>
            <label
              htmlFor="speciality"
              className="block mb-1 font-medium text-gray-700"
            >
              Speciality
            </label>
            <select
              id="speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Speciality</option>
              {specialityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Time Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="availableFrom"
                className="block mb-1 font-medium text-gray-700"
              >
                Available From
              </label>
              <input
                id="availableFrom"
                name="availableFrom"
                type="time"
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="availableTo"
                className="block mb-1 font-medium text-gray-700"
              >
                Available To
              </label>
              <input
                id="availableTo"
                name="availableTo"
                type="time"
                value={formData.availableTo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Preview Panel */}
      <div className="w-full p-6 border border-indigo-100 shadow-xl bg-white/70 backdrop-blur-md lg:w-1/3 rounded-3xl">
        <h3 className="mb-4 text-xl font-semibold text-center text-indigo-700">
          Live Preview
        </h3>
        {formData.photoUrl ? (
          <img
            src={formData.photoUrl}
            alt="Preview"
            className="object-cover w-32 h-32 mx-auto mb-4 border-4 border-indigo-400 rounded-full shadow-md"
          />
        ) : (
          <p className="text-center text-gray-400">No photo uploaded</p>
        )}

        <div className="space-y-2 text-sm text-gray-700">
          <Info label="Name" value={formData.name} />
          <Info label="Email" value={formData.email} />
          <Info label="Phone" value={formData.phone} />
          <Info label="Speciality" value={formData.speciality} />
          <Info label="Clinic" value={formData.clinicAddress} />
          <Info
            label="Experience"
            value={`${formData.experienceYears} years`}
          />
          <Info
            label="Available"
            value={
              formData.availableFrom && formData.availableTo
                ? `${formData.availableFrom} - ${formData.availableTo}`
                : "N/A"
            }
          />
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value || "N/A"}
  </p>
);

export default DoctorProfileEdit;
