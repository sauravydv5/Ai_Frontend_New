// DoctorDiagnosisForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorDiagnosisForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch accepted appointments
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/doctor/my-appointments",
          {
            withCredentials: true,
          }
        );
        const pending = res.data.data.filter(
          (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
        );
        setAppointments(pending);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "localhost:3000/appointments/submitdiagnosis",
        formData,
        { withCredentials: true }
      );
      setMessage("Diagnosis submitted successfully!");
      setFormData({ appointmentId: "", diagnosis: "", prescription: "" });
    } catch (err) {
      console.error(err);
      setMessage("Submission failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Submit Diagnosis</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Appointment</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.appointmentId}
            onChange={(e) =>
              setFormData({ ...formData, appointmentId: e.target.value })
            }
          >
            <option value="">-- Select --</option>
            {appointments.map((appt) => (
              <option key={appt._id} value={appt._id}>
                {appt.patientName} -{" "}
                {new Date(appt.appointmentDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Diagnosis</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1">Prescription</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.prescription}
            onChange={(e) =>
              setFormData({ ...formData, prescription: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorDiagnosisForm;
