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
    const localPatient = localStorage.getItem("patientInfo");
    if (localPatient) {
      const profile = JSON.parse(localPatient);
      setFormData((prev) => ({
        ...prev,
        ...profile,
      }));
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/patient/profile",
          { withCredentials: true }
        );

        const profile = data.data;
        setFormData((prev) => ({
          ...prev,
          ...profile,
        }));

        localStorage.setItem("patientInfo", JSON.stringify(profile));
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
        "http://localhost:3000/patient/profile/edit",
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
    <div className="max-w-4xl px-6 py-10 mx-auto bg-white rounded-xl shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-center text-teal-700">
        Edit Patient Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
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
            <label
              htmlFor={name}
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name] || ""}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientProfile;
