import React, { useEffect, useState } from "react";
import axios from "axios";

const SeeAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const patient = JSON.parse(localStorage.getItem("patient"));

  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/appointments/appointments-list",
        { withCredentials: true }
      );
      setAppointments(res.data.data);
    } catch (err) {
      alert("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const updateAppointmentStatus = async (id, status) => {
    setProcessingId(id);
    try {
      const url = `http://localhost:3000/appointments/updateStatus/${id}`;
      await axios.patch(url, { status }, { withCredentials: true });
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      alert("Failed to update appointment status.");
    } finally {
      setProcessingId(null);
    }
  };

  const pending = appointments.filter((a) => a.status === "pending");
  const accepted = appointments.filter((a) => a.status === "accepted");
  const rejected = appointments.filter((a) => a.status === "rejected");

  const renderTable = (title, data, color) => (
    <div className="mb-10 bg-white shadow-md rounded-xl">
      <div className={`px-6 py-4 border-b ${color.bg}`}>
        <h3 className={`text-xl font-bold ${color.text}`}>
          {title} ({data.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No records found.</p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="font-semibold text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-2 border">Patient</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Status</th>
                {title === "Pending Requests" && (
                  <th className="px-4 py-2 border">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {appt?.patient?.name} {appt?.patient?.lastName}
                  </td>

                  <td className="px-4 py-2 border">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{appt.appointmentTime}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        appt.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  {title === "Pending Requests" && (
                    <td className="px-4 py-2 space-x-2 border">
                      <button
                        disabled={processingId === appt._id}
                        onClick={() =>
                          updateAppointmentStatus(appt._id, "accepted")
                        }
                        className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {processingId === appt._id ? "Accepting..." : "Accept"}
                      </button>
                      <button
                        disabled={processingId === appt._id}
                        onClick={() =>
                          updateAppointmentStatus(appt._id, "rejected")
                        }
                        className="px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {processingId === appt._id ? "Rejecting..." : "Reject"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  if (loading)
    return (
      <p className="mt-20 text-center text-gray-600">Loading appointments...</p>
    );

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        Doctor Dashboard
      </h2>
      {renderTable("Pending Requests", pending, {
        bg: "bg-yellow-50",
        text: "text-yellow-800",
      })}
      {renderTable("Accepted Appointments", accepted, {
        bg: "bg-green-50",
        text: "text-green-800",
      })}
      {renderTable("Rejected Appointments", rejected, {
        bg: "bg-red-50",
        text: "text-red-800",
      })}
    </div>
  );
};

export default SeeAppointmentList;
