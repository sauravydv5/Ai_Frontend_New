import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useLocation } from "react-router-dom";

const AppointmentBooking = () => {
  const location = useLocation();
  const selectedDoctorFromState = location.state?.doctor || null;

  const [formData, setFormData] = useState({
    name: "",
    doctor: selectedDoctorFromState?._id || "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only accepted doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/list`, {
          withCredentials: true,
        });
        const acceptedDoctors = (res.data.doctors || []).filter(
          (doc) => doc.status === "Accepted"
        );
        setDoctors(acceptedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };
    fetchDoctors();
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
      const res = await axios.post(
        `${BASE_URL}/appointments/appointmentCreate`,
        formData,
        { withCredentials: true }
      );
      setResponse({ success: true, message: res.data.message });
      setFormData({
        name: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
    } catch (error) {
      setResponse({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Doctor Selection */}
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.firstName} {doc.lastName} ({doc.speciality || "Specialist"})
            </option>
          ))}
        </select>

        {/* Appointment Date */}
        <input
          type="date"
          name="appointmentDate"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        {/* Appointment Time */}
        <input
          type="time"
          name="appointmentTime"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />

        {/* Reason Field */}
        <textarea
          name="reason"
          rows="3"
          placeholder="Reason for appointment"
          className="w-full p-3 border rounded-lg"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {/* Response Message */}
      {response && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            response.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
