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
    photoUrl: "", // ✅ Added for profile image
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localPatient = localStorage.getItem("patientInfo");
    if (localPatient) {
      const profile = JSON.parse(localPatient);
      const allowedFields = Object.keys(formData);
      const filteredProfile = {};
      allowedFields.forEach((key) => {
        if (profile[key]) filteredProfile[key] = profile[key];
      });

      setFormData((prev) => ({
        ...prev,
        ...filteredProfile,
      }));
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(BASE_URL + "/patient/profile/view", {
          withCredentials: true,
        });

        const profile = data.data;
        const allowedFields = Object.keys(formData);
        const filteredProfile = {};
        allowedFields.forEach((key) => {
          if (profile[key]) filteredProfile[key] = profile[key];
        });

        setFormData((prev) => ({
          ...prev,
          ...filteredProfile,
        }));

        localStorage.setItem("patientInfo", JSON.stringify(filteredProfile));
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.patch(
        BASE_URL + "/patient/profile/edit",
        formData,
        { withCredentials: true }
      );

      toast.success(data.message || "Profile updated successfully");
      const updated = { ...formData, updatedAt: new Date().toISOString() };
      localStorage.setItem("patientInfo", JSON.stringify(updated));
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-teal-700">
        Edit Patient Profile
      </h1>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
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
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Live Preview */}
        <div className="p-6 rounded-md shadow-sm bg-gray-50">
          <h2 className="mb-4 text-2xl font-semibold text-center text-teal-700">
            Live Preview
          </h2>

          <div className="flex flex-col items-center mb-6">
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

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Email:</strong> {formData.emailId}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Age:</strong> {formData.age}
            </p>
            <p>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>Blood Group:</strong> {formData.bloodGroup}
            </p>
            <p>
              <strong>Allergies:</strong> {formData.allergies}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {formData.emergencyContact}
            </p>
            <p>
              <strong>Medical History:</strong> {formData.medicalHistory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientProfile;
