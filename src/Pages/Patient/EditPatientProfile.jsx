import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load from localStorage first
    const localPatient = localStorage.getItem("patientInfo");
    if (localPatient) {
      const profile = JSON.parse(localPatient);
      setFormData({
        firstName: profile.firstName || "",
        emailId: profile.emailId || "",
        phone: profile.phone || "",
        age: profile.age || "",
        gender: profile.gender || "",
        address: profile.address || "",
        bloodGroup: profile.bloodGroup || "",
        medicalHistory: profile.medicalHistory || "",
        emergencyContact: profile.emergencyContact || "",
        allergies: profile.allergies || "",
      });
    }

    // Then fetch latest profile from backend
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/patient/profile",
          {
            withCredentials: true,
          }
        );

        const profile = data.data;
        setFormData({
          firstName: profile.firstName || "",
          emailId: profile.emailId || "",
          phone: profile.phone || "",
          age: profile.age || "",
          gender: profile.gender || "",
          address: profile.address || "",
          bloodGroup: profile.bloodGroup || "",
          medicalHistory: profile.medicalHistory || "",
          emergencyContact: profile.emergencyContact || "",
          allergies: profile.allergies || "",
        });

        localStorage.setItem("patientInfo", JSON.stringify(profile));
      } catch (err) {
        toast.error("Failed to load profile from server");
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
        "http://localhost:3000/patient/profile/edit",
        formData,
        { withCredentials: true }
      );

      toast.success(data.message || "Profile updated successfully");

      // Update essential fields in localStorage
      const existing = JSON.parse(localStorage.getItem("patientInfo")) || {};
      const updated = {
        ...existing,
        firstName: formData.firstName,
        emailId: formData.emailId,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        age: formData.age,
        bloodGroup: formData.bloodGroup,
        medicalHistory: formData.medicalHistory,
        emergencyContact: formData.emergencyContact,
        allergies: formData.allergies,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("patientInfo", JSON.stringify(updated));
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow">
      <h2 className="mb-6 text-2xl font-semibold text-teal-700">
        Edit Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
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
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white transition bg-teal-600 rounded hover:bg-teal-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientProfile;
