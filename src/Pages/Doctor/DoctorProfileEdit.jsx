import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

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
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (doctorData) {
      setFormData({
        _id: doctorData._id || "",
        name: doctorData.firstName || "",
        email: doctorData.emailId || "",
        phone: doctorData.phone || "",
        speciality: doctorData.speciality || "",
        clinicAddress: doctorData.clinicAddress || "",
        experienceYears: doctorData.experienceYears || "",
        availableFrom: doctorData.availableFrom || "",
        availableTo: doctorData.availableTo || "",
        photoUrl: doctorData.photoUrl || "", // <-- ensure this is saved
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        BASE_URL + "/doctor/profile/edit",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "Profile updated successfully");

      // Update localStorage doctor object
      const updatedDoctor = {
        _id: formData._id,
        firstName: formData.name,
        emailId: formData.email,
        phone: formData.phone,
        speciality: formData.speciality,
        clinicAddress: formData.clinicAddress,
        experienceYears: formData.experienceYears,
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
        photoUrl: formData.photoUrl,
      };

      localStorage.setItem("doctor", JSON.stringify(updatedDoctor));
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="flex flex-col max-w-6xl gap-8 p-4 mx-auto mt-10 lg:flex-row">
      {/* Form Panel */}
      <div className="w-full p-6 bg-white shadow-md lg:w-2/3 rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Edit Doctor Profile
        </h2>
        {message && <p className="mb-4 text-center text-blue-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo URL */}
          <div>
            <label htmlFor="photoUrl" className="block mb-1 font-medium">
              Profile Photo URL
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Other Fields */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="speciality" className="block mb-1 font-medium">
              Speciality
            </label>
            <select
              id="speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Speciality</option>
              {specialityOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="clinicAddress" className="block mb-1 font-medium">
              Clinic Address
            </label>
            <input
              id="clinicAddress"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
              placeholder="Clinic Address"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="experienceYears" className="block mb-1 font-medium">
              Experience (Years)
            </label>
            <input
              id="experienceYears"
              name="experienceYears"
              type="number"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="availableFrom" className="block mb-1 font-medium">
                Available From
              </label>
              <input
                id="availableFrom"
                name="availableFrom"
                type="time"
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="availableTo" className="block mb-1 font-medium">
                Available To
              </label>
              <input
                id="availableTo"
                name="availableTo"
                type="time"
                value={formData.availableTo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Profile Preview Panel */}
      <div className="w-full p-6 bg-white shadow-md lg:w-1/3 rounded-xl">
        <h3 className="mb-4 text-xl font-semibold text-center">
          Profile Preview
        </h3>
        {formData.photoUrl ? (
          <img
            src={formData.photoUrl}
            alt="Doctor"
            className="object-cover w-32 h-32 mx-auto mb-4 border rounded-full"
          />
        ) : (
          <p className="text-center text-gray-500">No photo added</p>
        )}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {formData.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {formData.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone || "N/A"}
          </p>
          <p>
            <strong>Speciality:</strong> {formData.speciality || "N/A"}
          </p>
          <p>
            <strong>Clinic:</strong> {formData.clinicAddress || "N/A"}
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {formData.experienceYears
              ? `${formData.experienceYears} years`
              : "N/A"}
          </p>
          <p>
            <strong>Available:</strong>{" "}
            {formData.availableFrom && formData.availableTo
              ? `${formData.availableFrom} - ${formData.availableTo}`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileEdit;
