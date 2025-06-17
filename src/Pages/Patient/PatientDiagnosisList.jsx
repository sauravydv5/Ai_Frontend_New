// NEW CODE

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Loader } from "lucide-react";

const PatientDiagnosisList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/appointments/getdigonsisresult`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load diagnosis.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-blue-600">
        <Loader className="w-6 h-6 mr-2 animate-spin" />
        <span className="text-lg">Loading diagnosis...</span>
      </div>
    );
  }

  if (error) {
    return <p className="mt-10 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl px-4 py-10 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center text-teal-800">
        🩺 My Prescriptions
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          You don't have any diagnosis records yet.
        </p>
      ) : (
        <div className="space-y-8">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="p-6 bg-white border border-gray-300 shadow-md rounded-xl"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-teal-700">
                    Dr. {appt?.doctor?.firstName || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(appt?.appointmentDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Appointment ID:</p>
                  <p className="font-mono text-xs text-gray-700">{appt._id}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-800">Reason for Visit:</p>
                <p className="text-gray-700">{appt.reason || "N/A"}</p>
              </div>

              <div>
                <p className="mb-1 font-medium text-gray-800">Prescription:</p>
                <pre className="p-4 overflow-y-auto text-gray-900 whitespace-pre-wrap border border-gray-200 rounded-md bg-gray-50 max-h-60">
                  {appt.prescription || "No prescription available."}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDiagnosisList;
