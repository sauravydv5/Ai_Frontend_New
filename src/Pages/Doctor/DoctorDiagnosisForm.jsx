import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const DoctorDiagnosisForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
  });
  const [message, setMessage] = useState("");

  // Debounced fetchAppointments
  const fetchAppointments = useCallback(
    debounce(async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/appointments/appointments-list",
          { withCredentials: true }
        );

        const pending = res.data.data.filter(
          (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
        );

        setAppointments(pending);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    }, 300), // Debounce time: 300ms
    []
  );

  useEffect(() => {
    fetchAppointments();

    // Cancel debounce on unmount
    return () => {
      fetchAppointments.cancel();
    };
  }, [fetchAppointments]);

  // Debounced handler for textareas
  const handleInputChange = debounce((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, 300);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/appointments/submitdiagnosis",
        formData,
        { withCredentials: true }
      );

      setMessage("✅ Diagnosis submitted successfully!");

      const newEntry = {
        appointmentId: formData.appointmentId,
        diagnosis: formData.diagnosis,
        prescription: formData.prescription,
        submittedAt: new Date().toISOString(),
      };

      const previous = JSON.parse(localStorage.getItem("diagnosisData")) || [];
      localStorage.setItem(
        "diagnosisData",
        JSON.stringify([...previous, newEntry])
      );

      setFormData({ appointmentId: "", diagnosis: "", prescription: "" });

      // Refresh appointments
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
            value={formData.appointmentId}
            onChange={(e) =>
              setFormData({ ...formData, appointmentId: e.target.value })
            }
            required
          >
            <option value="">-- Select --</option>
            {appointments.map((appt) => (
              <option key={appt._id} value={appt._id}>
                {appt.name} —{" "}
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
            defaultValue={formData.diagnosis}
            onChange={(e) => handleInputChange("diagnosis", e.target.value)}
            placeholder="Enter diagnosis..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prescription</label>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            defaultValue={formData.prescription}
            onChange={(e) => handleInputChange("prescription", e.target.value)}
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
