// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchMyAppointments = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/appointments/my-appointments",
//         { withCredentials: true }
//       );
//       setAppointments(res.data.data);
//     } catch (err) {
//       console.error("Error fetching my appointments:", err);
//       setError("Failed to load your appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyAppointments();
//   }, []);

//   if (loading)
//     return <p className="py-10 text-center text-gray-600">Loading...</p>;

//   if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-6xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
//       <h2 className="mb-6 text-2xl font-semibold text-gray-800">
//         My Appointments
//       </h2>

//       {appointments.length === 0 ? (
//         <p className="text-gray-600">You have not made any appointments yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left border">
//             <thead className="text-gray-700 bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">Doctor</th>
//                 <th className="px-4 py-2 border">Speciality</th>
//                 <th className="px-4 py-2 border">Date</th>
//                 <th className="px-4 py-2 border">Time</th>
//                 <th className="px-4 py-2 border">Reason</th>
//                 <th className="px-4 py-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appt) => (
//                 <tr key={appt._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{appt.doctor?.firstName}</td>
//                   <td className="px-4 py-2 border">
//                     {appt.doctor?.speciality}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {new Date(appt.appointmentDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border">{appt.appointmentTime}</td>
//                   <td className="px-4 py-2 border">{appt.reason}</td>
//                   <td className="px-4 py-2 font-semibold border">
//                     {appt.status ? (
//                       <span
//                         className={`px-2 py-1 rounded-full text-white ${
//                           appt.status === "accepted"
//                             ? "bg-green-600"
//                             : appt.status === "rejected"
//                             ? "bg-red-600"
//                             : "bg-yellow-500"
//                         }`}
//                       >
//                         {appt.status.charAt(0).toUpperCase() +
//                           appt.status.slice(1)}
//                       </span>
//                     ) : (
//                       <span className="text-gray-500">Pending</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  AlertCircle,
  User,
} from "lucide-react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/appointments/my-appointments",
        {
          withCredentials: true,
        }
      );
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching my appointments:", err);
      setError("Failed to load your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  if (loading)
    return (
      <p className="py-10 text-center text-gray-600 animate-pulse">
        Loading appointments...
      </p>
    );

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl px-6 py-10 mx-auto mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="mb-6 text-3xl font-bold text-blue-700">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">You have not made any appointments yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="p-6 space-y-3 transition-all border shadow-sm bg-gray-50 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                  <User className="inline-block w-4 h-4 mr-1" />
                  Dr. {appt.doctor?.firstName}
                </h4>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full text-white ${
                    appt.status === "accepted"
                      ? "bg-green-600"
                      : appt.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <Stethoscope className="inline-block w-4 h-4 mr-1" />
                Speciality: {appt.doctor?.speciality}
              </p>

              <p className="text-sm text-gray-600">
                <CalendarDays className="inline-block w-4 h-4 mr-1" />
                {new Date(appt.appointmentDate).toLocaleDateString()}
              </p>

              <p className="text-sm text-gray-600">
                <Clock className="inline-block w-4 h-4 mr-1" />
                {appt.appointmentTime}
              </p>

              <p className="text-sm text-gray-600">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                Reason: {appt.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
