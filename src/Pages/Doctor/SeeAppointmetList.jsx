import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const SeeAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        BASE_URL + "/appointments/appointments-list",
        { withCredentials: true }
      );
      setAppointments(res.data.data || []);
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
      const url = `${BASE_URL}/appointments/updateStatus/${id}`;
      await axios.patch(url, { status }, { withCredentials: true });

      const updatedAppointments = appointments.map((appt) =>
        appt._id === id ? { ...appt, status } : appt
      );
      setAppointments(updatedAppointments);
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
    <div className="mb-10 overflow-hidden bg-white shadow-xl rounded-xl">
      <div className={`px-6 py-4 border-b ${color.bg}`}>
        <h3 className={`text-xl font-bold ${color.text}`}>
          {title} <span className="ml-1 text-sm">({data.length})</span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No appointments available.
          </p>
        ) : (
          <table className="w-full text-sm text-left table-auto">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Patient</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Status</th>
                {title === "Pending Requests" && (
                  <th className="px-4 py-2 text-center border">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((appt) => (
                <tr key={appt._id} className="transition hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {appt?.name ||
                      `${appt?.patient?.name || ""} ${
                        appt?.patient?.lastName || ""
                      }`}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{appt.appointmentTime}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full capitalize ${
                        appt.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  {title === "Pending Requests" && (
                    <td className="px-4 py-2 space-x-2 text-center border">
                      <button
                        disabled={processingId === appt._id}
                        onClick={() =>
                          updateAppointmentStatus(appt._id, "accepted")
                        }
                        className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-60"
                      >
                        {processingId === appt._id ? "Accepting..." : "Accept"}
                      </button>
                      <button
                        disabled={processingId === appt._id}
                        onClick={() =>
                          updateAppointmentStatus(appt._id, "rejected")
                        }
                        className="px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-60"
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg text-gray-500">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        Doctor Dashboard
      </h2>
      {renderTable("Pending Requests", pending, {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
      })}
      {renderTable("Accepted Appointments", accepted, {
        bg: "bg-green-100",
        text: "text-green-800",
      })}
      {renderTable("Rejected Appointments", rejected, {
        bg: "bg-red-100",
        text: "text-red-800",
      })}
    </div>
  );
};

export default SeeAppointmentList;
