import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplyAsDoctor = ({ user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    speciality: "",
    phone: "",
    clinicAddress: "",
    experienceYears: "",
    availableFrom: "",
    availableTo: "",
  });

  const [picture, setPicture] = useState(null); // File input
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (picture) {
        data.append("picture", picture);
      }

      const response = await axios.post(
        "http//:localhost:3000/doctor/apply-doctor",
        data,
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/Doctor-dashboard");
      }, 1000);
    } catch (error) {
      console.error("Application Error:", error);
      setMessage(
        error.response?.data?.message || "Something went wrong while applying."
      );
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Apply as Doctor</h2>

      {message && <div className="mb-4 text-blue-700">{message}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="speciality"
          placeholder="Speciality"
          value={formData.speciality}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="clinicAddress"
          placeholder="Clinic Address"
          value={formData.clinicAddress}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="number"
          name="experienceYears"
          placeholder="Years of Experience"
          value={formData.experienceYears}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Available From</label>
            <input
              type="time"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Available To</label>
            <input
              type="time"
              name="availableTo"
              value={formData.availableTo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            name="picture"
            onChange={handlePictureChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyAsDoctor;
