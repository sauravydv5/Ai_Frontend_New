import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { ClipboardList, Stethoscope, FileText, Loader2 } from "lucide-react";

const DoctorDiagnosisForm = () => {
  const location = useLocation();

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false); // ✅ loader state
  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch accepted appointments
  const fetchAppointments = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      setLoadingAppointments(true); // start loading
      const res = await axios.get(
        `${BASE_URL}/appointments/appointments-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingAppointments(false); // stop loading

      const pending = res.data.data.filter(
        (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
      );

      setAppointments(pending);
    } catch (err) {
      setLoadingAppointments(false);
      console.error("Error fetching appointments:", err);
      setMessage("❌ Failed to load appointments. Please log in again.");
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        prescription: location.state.prescription || "",
        diagnosis: location.state.diagnosis || "",
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Token not found. Please log in.");
        return;
      }

      await axios.post(`${BASE_URL}/appointments/submitdiagnosis`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <div className="max-w-3xl px-6 py-10 mx-auto mt-10 shadow-xl bg-gradient-to-br from-white via-blue-50 to-white rounded-xl">
      <div className="flex items-center justify-center mb-6 text-blue-700">
        <Stethoscope className="w-8 h-8 mr-2" />
        <h2 className="text-3xl font-bold">Diagnosis & Prescription</h2>
      </div>

      {/* ✅ Message */}
      {message && (
        <p
          className={`mb-6 text-center text-sm font-semibold ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ✅ Appointment Dropdown with Loader */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <ClipboardList className="inline w-4 h-4 mr-1 text-blue-600" />
            Select Appointment
          </label>

          {loadingAppointments ? (
            <div className="flex items-center gap-2 text-sm text-blue-600 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading appointments...
            </div>
          ) : (
            <select
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Appointment --</option>
              {appointments.length > 0 ? (
                appointments.map((appt) => {
                  const patient = appt?.patient || {};
                  const fullName =
                    patient.firstName && patient.lastName
                      ? `${patient.firstName} ${patient.lastName}`
                      : appt.name || "Unnamed Patient";

                  const formattedDate = new Date(
                    appt.appointmentDate
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  });

                  return (
                    <option
                      key={appt._id}
                      value={appt._id}
                      title={`Email: ${patient.email || "N/A"}\nPatient ID: ${
                        patient._id || "N/A"
                      }`}
                    >
                      {fullName} — {formattedDate}
                    </option>
                  );
                })
              ) : (
                <option disabled>No pending appointments</option>
              )}
            </select>
          )}
        </div>

        {/* ✅ Diagnosis */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <FileText className="inline w-4 h-4 mr-1 text-blue-600" />
            Diagnosis
          </label>
          <textarea
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Enter your diagnosis here..."
            required
          />
        </div>

        {/* ✅ Prescription with Warning Note */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <FileText className="inline w-4 h-4 mr-1 text-blue-600" />
            Prescription
          </label>
          <textarea
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            placeholder="Enter the prescription..."
            required
          />
          <p className="mt-1 text-xs text-yellow-600">
            ⚠️ Please double-check dosage, allergies, and interactions before
            submitting.
          </p>
        </div>

        {/* ✅ Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full px-5 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Submit Diagnosis
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorDiagnosisForm;
