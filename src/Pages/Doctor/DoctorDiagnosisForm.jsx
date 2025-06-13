import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const DoctorDiagnosisForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
  });
  const [message, setMessage] = useState("");

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/appointments/appointments-list",
        { withCredentials: true }
      );

      const pending = res.data.data.filter(
        (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
      );

      setAppointments(pending);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(BASE_URL + "/appointments/submitdiagnosis", formData, {
        withCredentials: true,
      });

      setMessage("✅ Diagnosis submitted successfully!");
      setFormData({ appointmentId: "", diagnosis: "", prescription: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Submission failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">
        Submit Diagnosis & Prescription
      </h2>

      {message && (
        <p
          className={`mb-4 text-center font-medium ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Appointment</label>
          <select
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            {appointments.map((appt) => (
              <option key={appt._id} value={appt._id}>
                {appt.patient?.name || "Unnamed Patient"} —{" "}
                {new Date(appt.appointmentDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Diagnosis</label>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Enter diagnosis..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prescription</label>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            placeholder="Enter prescription..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit Diagnosis
        </button>
      </form>
    </div>
  );
};

export default DoctorDiagnosisForm;
