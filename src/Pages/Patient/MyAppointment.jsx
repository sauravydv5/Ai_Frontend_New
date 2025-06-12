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
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState({});

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/appointments/my-appointments",
        { withCredentials: true }
      );
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const doctorList = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(doctorList);
    fetchMyAppointments();
  }, []);

  const getDoctorFromLocal = (docRef) => {
    const id = typeof docRef === "string" ? docRef : docRef?._id;
    return doctors.find((doc) => doc._id === id) || {};
  };

  const toggleFeedback = (id) => {
    setFeedbackVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <p className="py-10 text-center text-gray-600 animate-pulse">
        Loading appointments...
      </p>
    );

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto mt-8 bg-white shadow-md md:px-8 lg:px-10 rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-700 md:text-3xl md:text-left">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not made any appointments yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => {
            const doctor = getDoctorFromLocal(appt.doctor);
            return (
              <div
                key={appt._id}
                className="p-5 space-y-3 transition-shadow border shadow bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-800 md:text-lg">
                    <User className="inline w-4 h-4 mr-1 text-blue-600" />
                    Dr. {doctor.firstName || "Not Found"}
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
                  <Stethoscope className="inline w-4 h-4 mr-1 text-purple-600" />
                  Speciality: {doctor.speciality || "Not Found"}
                </p>

                <p className="text-sm text-gray-600">
                  <CalendarDays className="inline w-4 h-4 mr-1 text-green-600" />
                  {new Date(appt.appointmentDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <Clock className="inline w-4 h-4 mr-1 text-orange-600" />
                  {appt.appointmentTime}
                </p>

                <p className="text-sm text-gray-600">
                  <AlertCircle className="inline w-4 h-4 mr-1 text-red-600" />
                  Reason: {appt.reason}
                </p>

                {appt.status === "accepted" && (
                  <>
                    <button
                      onClick={() => toggleFeedback(appt._id)}
                      className="px-4 py-1 mt-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                    >
                      {feedbackVisible[appt._id]
                        ? "Cancel Feedback"
                        : "Give Feedback"}
                    </button>

                    {feedbackVisible[appt._id] && (
                      <FeedbackForm
                        appointmentId={appt._id}
                        onCancel={() => toggleFeedback(appt._id)}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

// // ✅ Feedback Form Component
// const FeedbackForm = ({ appointmentId, onCancel }) => {
//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");
//   const [message, setMessage] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const submitFeedback = async () => {
//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem("patientToken");

//       const res = await axios.post(
//         "http://localhost:3000/appointments/feedback",
//         {
//           appointmentId,
//           rating,
//           comment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage({ type: "success", text: res.data.message });
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Failed to submit feedback",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-4 mt-3 bg-white border rounded-lg shadow-sm">
//       {message && (
//         <p
//           className={`text-sm mb-2 ${
//             message.type === "success" ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message.text}
//         </p>
//       )}
//       {!message && (
//         <>
//           <div className="mb-2">
//             <label className="text-sm font-medium">Rating (1–5):</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="w-full px-3 py-1 mt-1 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <label className="text-sm font-medium">Comment:</label>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={3}
//               className="w-full px-3 py-1 mt-1 border rounded"
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={onCancel}
//               className="px-4 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={submitFeedback}
//               disabled={submitting}
//               className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
//             >
//               {submitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   CalendarDays,
//   Clock,
//   Stethoscope,
//   AlertCircle,
//   User,
//   Trash2,
// } from "lucide-react";
// import FeedbackForm from "./FeedbackForm"; // Make sure this component exists

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [feedbackVisible, setFeedbackVisible] = useState({});

//   const fetchMyAppointments = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/appointments/my-appointments",
//         { withCredentials: true }
//       );
//       setAppointments(res.data.data);
//     } catch (err) {
//       console.error("Error fetching appointments:", err);
//       setError("Failed to load your appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const doctorList = JSON.parse(localStorage.getItem("doctors")) || [];
//     setDoctors(doctorList);
//     fetchMyAppointments();
//   }, []);

//   const getDoctorFromLocal = (docRef) => {
//     const id = typeof docRef === "string" ? docRef : docRef?._id;
//     return doctors.find((doc) => doc._id === id) || {};
//   };

//   const toggleFeedback = (id) => {
//     setFeedbackVisible((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleDelete = async (appointmentId) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/appointments/delete/${appointmentId}`,
//         { withCredentials: true }
//       );
//       // Refresh list after delete
//       setAppointments((prev) =>
//         prev.filter((appt) => appt._id !== appointmentId)
//       );
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete appointment.");
//     }
//   };

//   if (loading)
//     return (
//       <p className="py-10 text-center text-gray-600 animate-pulse">
//         Loading appointments...
//       </p>
//     );

//   if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-6xl px-4 py-8 mx-auto mt-8 bg-white shadow-md md:px-8 lg:px-10 rounded-2xl">
//       <h2 className="mb-6 text-2xl font-bold text-center text-blue-700 md:text-3xl md:text-left">
//         My Appointments
//       </h2>

//       {appointments.length === 0 ? (
//         <p className="text-center text-gray-600">
//           You have not made any appointments yet.
//         </p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {appointments.map((appt) => {
//             const doctor = getDoctorFromLocal(appt.doctor);
//             return (
//               <div
//                 key={appt._id}
//                 className="p-5 space-y-3 transition-shadow border shadow bg-gray-50 rounded-xl hover:shadow-lg"
//               >
//                 <div className="flex items-center justify-between">
//                   <h4 className="text-base font-semibold text-gray-800 md:text-lg">
//                     <User className="inline w-4 h-4 mr-1 text-blue-600" />
//                     Dr. {doctor.firstName || "Not Found"}
//                   </h4>
//                   <span
//                     className={`text-xs font-medium px-3 py-1 rounded-full text-white ${
//                       appt.status === "accepted"
//                         ? "bg-green-600"
//                         : appt.status === "rejected"
//                         ? "bg-red-600"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600">
//                   <Stethoscope className="inline w-4 h-4 mr-1 text-purple-600" />
//                   Speciality: {doctor.speciality || "Not Found"}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   <CalendarDays className="inline w-4 h-4 mr-1 text-green-600" />
//                   {new Date(appt.appointmentDate).toLocaleDateString()}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   <Clock className="inline w-4 h-4 mr-1 text-orange-600" />
//                   {appt.appointmentTime}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   <AlertCircle className="inline w-4 h-4 mr-1 text-red-600" />
//                   Reason: {appt.reason}
//                 </p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() => handleDelete(appt._id)}
//                     className="flex items-center px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
//                   >
//                     <Trash2 className="w-4 h-4 mr-1" />
//                     Delete
//                   </button>

//                   {appt.status === "accepted" && (
//                     <>
//                       <button
//                         onClick={() => toggleFeedback(appt._id)}
//                         className="px-4 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
//                       >
//                         {feedbackVisible[appt._id]
//                           ? "Cancel Feedback"
//                           : "Give Feedback"}
//                       </button>

//                       {feedbackVisible[appt._id] && (
//                         <FeedbackForm
//                           appointmentId={appt._id}
//                           onCancel={() => toggleFeedback(appt._id)}
//                         />
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;

// //Delete Backedn
// router.delete("/appointments/delete/:id", authMiddleware, async (req, res) => {
//   try {
//     const appt = await Appointment.findById(req.params.id);
//     if (!appt)
//       return res.status(404).json({ message: "Appointment not found" });

//     await appt.deleteOne();
//     res.status(200).json({ message: "Appointment deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
