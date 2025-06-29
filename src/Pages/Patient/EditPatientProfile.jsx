import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const EditPatientProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    emailId: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    bloodGroup: "",
    medicalHistory: "",
    emergencyContact: "",
    allergies: "",
    photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/patient/profile/view`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = data.data;
        const allowedFields = Object.keys(formData);
        const filteredProfile = {};

        allowedFields.forEach((key) => {
          if (profile[key]) filteredProfile[key] = profile[key];
        });

        setFormData((prev) => ({ ...prev, ...filteredProfile }));
      } catch (err) {
        toast.error("❌ Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    if (token) fetchProfile();
    else {
      toast.error("Please login to continue");
      setFetching(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.patch(
        `${BASE_URL}/patient/profile/edit`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(data.message || "Profile updated successfully");
      setSuccessMsg(data.message || "Profile updated successfully");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-lg font-semibold text-teal-600 animate-pulse">
          <div className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-teal-700">
        ✏️ Edit Patient Profile
      </h1>

      {successMsg && (
        <div className="px-4 py-3 mb-6 font-medium text-center text-green-800 bg-green-100 border border-green-400 rounded-md">
          ✅ {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div className="grid grid-cols-1 gap-5">
            {[
              { name: "firstName", label: "Full Name" },
              { name: "emailId", label: "Email", type: "email" },
              { name: "phone", label: "Phone" },
              { name: "age", label: "Age", type: "number" },
              { name: "gender", label: "Gender" },
              { name: "address", label: "Address" },
              { name: "bloodGroup", label: "Blood Group" },
              { name: "medicalHistory", label: "Medical History" },
              { name: "allergies", label: "Allergies" },
              { name: "emergencyContact", label: "Emergency Contact" },
              { name: "photoUrl", label: "Profile Photo URL" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded-md transition ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* LIVE PREVIEW */}
        <div className="p-6 space-y-4 border rounded-md shadow-sm bg-gray-50">
          <h2 className="mb-4 text-2xl font-semibold text-center text-teal-700">
            👁️ Live Preview
          </h2>

          <div className="flex flex-col items-center">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt="Profile"
                className="object-cover w-32 h-32 border-4 border-teal-400 rounded-full shadow-md"
              />
            ) : (
              <div className="flex items-center justify-center w-32 h-32 text-white bg-gray-400 rounded-full shadow">
                No Photo
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>👤 Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>📧 Email:</strong> {formData.emailId}
            </p>
            <p>
              <strong>📱 Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>🎂 Age:</strong> {formData.age}
            </p>
            <p>
              <strong>🚻 Gender:</strong> {formData.gender}
            </p>
            <p>
              <strong>🏠 Address:</strong> {formData.address}
            </p>
            <p>
              <strong>🩸 Blood Group:</strong> {formData.bloodGroup}
            </p>
            <p>
              <strong>🚨 Allergies:</strong> {formData.allergies}
            </p>
            <p>
              <strong>📞 Emergency Contact:</strong> {formData.emergencyContact}
            </p>
            <p>
              <strong>📚 Medical History:</strong> {formData.medicalHistory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientProfile;
