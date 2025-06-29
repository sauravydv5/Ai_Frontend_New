import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

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
  const [minTime, setMinTime] = useState("00:00");

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("/doctor/list");
        const acceptedDoctors = (res.data.doctors || []).filter(
          (doc) => doc.status === "Accepted"
        );
        setDoctors(acceptedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    // If user selects today's date, set minimum time to current time
    if (formData.appointmentDate === getTodayDate()) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setMinTime(`${hours}:${minutes}`);
    } else {
      setMinTime("00:00");
    }
  }, [formData.appointmentDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/appointments/appointmentCreate",
        formData
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
    <div className="relative max-w-xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-2xl">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 rounded-2xl">
          <div className="w-12 h-12 border-[5px] border-teal-600 border-dashed rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}

      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Book an Appointment 🩺
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.firstName} {doc.lastName} ({doc.speciality || "Specialist"})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.appointmentDate}
          onChange={handleChange}
          min={getTodayDate()} // ✅ Restrict past dates
          required
        />

        <input
          type="time"
          name="appointmentTime"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.appointmentTime}
          onChange={handleChange}
          min={minTime} // ✅ Restrict past time if today
          required
        />

        <textarea
          name="reason"
          rows="3"
          placeholder="Reason for appointment"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-3 font-semibold text-white rounded-lg transition duration-200 ${
            loading
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {response && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm transition-all ${
            response.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
