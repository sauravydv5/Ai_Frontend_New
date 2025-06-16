// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constant";

// const SeeAppointmentList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   const fetchDoctorAppointments = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         BASE_URL + "/appointments/appointments-list",
//         { withCredentials: true }
//       );
//       setAppointments(res.data.data || []);
//     } catch (err) {
//       alert("Failed to load appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctorAppointments();
//   }, []);

//   const updateAppointmentStatus = async (id, status) => {
//     setProcessingId(id);
//     try {
//       const url = `${BASE_URL}/appointments/updateStatus/${id}`;
//       await axios.patch(url, { status }, { withCredentials: true });

//       const updatedAppointments = appointments.map((appt) =>
//         appt._id === id ? { ...appt, status } : appt
//       );
//       setAppointments(updatedAppointments);
//     } catch (err) {
//       alert("Failed to update appointment status.");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const groupedAppointments = {
//     pending: appointments.filter((a) => a.status === "pending"),
//     accepted: appointments.filter((a) => a.status === "accepted"),
//     rejected: appointments.filter((a) => a.status === "rejected"),
//   };

//   const statusColors = {
//     pending: "bg-yellow-100 text-yellow-800",
//     accepted: "bg-green-100 text-green-800",
//     rejected: "bg-red-100 text-red-800",
//   };

//   const AppointmentCard = ({ appt, showActions }) => {
//     const fullName = appt.patient
//       ? `${appt.patient.firstName || ""} ${appt.patient.lastName || ""}`
//       : appt.name || "Unknown Patient";

//     return (
//       <div className="p-4 transition bg-white border rounded-lg shadow-md hover:shadow-lg">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-lg font-semibold">{fullName}</h3>
//           <span
//             className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${
//               statusColors[appt.status]
//             }`}
//           >
//             {appt.status}
//           </span>
//         </div>
//         <p className="text-sm text-gray-600">
//           <strong>Date:</strong>{" "}
//           {new Date(appt.appointmentDate).toLocaleDateString()} |{" "}
//           <strong>Time:</strong> {appt.appointmentTime}
//         </p>
//         {appt.patient && (
//           <p className="mt-1 text-sm text-gray-600">
//             <strong>Email:</strong> {appt.patient.emailId} |{" "}
//             <strong>Phone:</strong> {appt.patient.phone}
//           </p>
//         )}
//         <p className="mt-1 text-sm text-gray-800">
//           <strong>Reason:</strong> {appt.reason || "N/A"}
//         </p>

//         {showActions && (
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => updateAppointmentStatus(appt._id, "accepted")}
//               disabled={processingId === appt._id}
//               className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
//             >
//               {processingId === appt._id ? "Accepting..." : "Accept"}
//             </button>
//             <button
//               onClick={() => updateAppointmentStatus(appt._id, "rejected")}
//               disabled={processingId === appt._id}
//               className="px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
//             >
//               {processingId === appt._id ? "Rejecting..." : "Reject"}
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderSection = (title, type) => (
//     <div className="mb-8">
//       <h2
//         className={`text-2xl font-bold mb-4 ${statusColors[type]
//           .split(" ")
//           .join(" ")}`}
//       >
//         {title} ({groupedAppointments[type].length})
//       </h2>
//       {groupedAppointments[type].length === 0 ? (
//         <p className="text-sm text-gray-500">No appointments found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {groupedAppointments[type].map((appt) => (
//             <AppointmentCard
//               key={appt._id}
//               appt={appt}
//               showActions={type === "pending"}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-6xl px-4 py-8 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold text-gray-800">
//         Appointments Overview
//       </h1>
//       {loading ? (
//         <div className="py-20 text-lg text-center text-gray-500">
//           Loading appointments...
//         </div>
//       ) : (
//         <>
//           {renderSection("Pending Requests", "pending")}
//           {renderSection("Accepted Appointments", "accepted")}
//           {renderSection("Rejected Appointments", "rejected")}
//         </>
//       )}
//     </div>
//   );
// };

// export default SeeAppointmentList;

// NEW CODE

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
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/appointments/appointments-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = localStorage.getItem("token");

      const url = `${BASE_URL}/appointments/updateStatus/${id}`;
      await axios.patch(
        url,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const groupedAppointments = {
    pending: appointments.filter((a) => a.status === "pending"),
    accepted: appointments.filter((a) => a.status === "accepted"),
    rejected: appointments.filter((a) => a.status === "rejected"),
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const AppointmentCard = ({ appt, showActions }) => {
    const fullName = appt.patient
      ? `${appt.patient.firstName || ""} ${appt.patient.lastName || ""}`
      : appt.name || "Unknown Patient";

    return (
      <div className="p-4 transition bg-white border rounded-lg shadow-md hover:shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{fullName}</h3>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${
              statusColors[appt.status]
            }`}
          >
            {appt.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Date:</strong>{" "}
          {new Date(appt.appointmentDate).toLocaleDateString()} |{" "}
          <strong>Time:</strong> {appt.appointmentTime}
        </p>
        {appt.patient && (
          <p className="mt-1 text-sm text-gray-600">
            <strong>Email:</strong> {appt.patient.emailId} |{" "}
            <strong>Phone:</strong> {appt.patient.phone}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-800">
          <strong>Reason:</strong> {appt.reason || "N/A"}
        </p>

        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => updateAppointmentStatus(appt._id, "accepted")}
              disabled={processingId === appt._id}
              className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {processingId === appt._id ? "Accepting..." : "Accept"}
            </button>
            <button
              onClick={() => updateAppointmentStatus(appt._id, "rejected")}
              disabled={processingId === appt._id}
              className="px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {processingId === appt._id ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (title, type) => (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold mb-4 ${statusColors[type]}`}>
        {title} ({groupedAppointments[type].length})
      </h2>
      {groupedAppointments[type].length === 0 ? (
        <p className="text-sm text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groupedAppointments[type].map((appt) => (
            <AppointmentCard
              key={appt._id}
              appt={appt}
              showActions={type === "pending"}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Appointments Overview
      </h1>
      {loading ? (
        <div className="py-20 text-lg text-center text-gray-500">
          Loading appointments...
        </div>
      ) : (
        <>
          {renderSection("Pending Requests", "pending")}
          {renderSection("Accepted Appointments", "accepted")}
          {renderSection("Rejected Appointments", "rejected")}
        </>
      )}
    </div>
  );
};

export default SeeAppointmentList;
