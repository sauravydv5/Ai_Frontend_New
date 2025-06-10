import React, { useState } from "react";
import axios from "axios";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/appointments/appointmentCreate",
        formData,
        {
          withCredentials: true,
        }
      );

      setResponse(response.data);
    } catch (error) {
      setResponse({
        success: false,
        message: error.response?.data?.message || error.message,
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
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name (e.g., Gautam Kumar)"
          className="w-full p-3 border rounded-lg"
          value={formData.doctorName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="appointmentDate"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="appointmentTime"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          rows="3"
          placeholder="Reason for appointment"
          className="w-full p-3 border rounded-lg"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
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
