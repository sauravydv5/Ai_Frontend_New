// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DoctorDiagnosisForm = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [formData, setFormData] = useState({
//     appointmentId: "",
//     diagnosis: "",
//     prescription: "",
//   });
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch accepted appointments with no existing diagnosis or prescription
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/appointments/appointments-list",
//           {
//             withCredentials: true,
//           }
//         );

//         const pending = res.data.data.filter(
//           (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
//         );

//         setAppointments(pending);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/appointments/submitdiagnosis",
//         formData,
//         { withCredentials: true }
//       );

//       setMessage("Diagnosis submitted successfully!");
//       setFormData({ appointmentId: "", diagnosis: "", prescription: "" });

//       // Optionally refresh appointment list after submission
//       const refreshed = await axios.get(
//         "http://localhost:3000/appointments/appointments-list",
//         { withCredentials: true }
//       );
//       const updated = refreshed.data.data.filter(
//         (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
//       );
//       setAppointments(updated);
//     } catch (err) {
//       console.error("Submission error:", err);
//       setMessage("Submission failed. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-xl p-6 mx-auto bg-white rounded shadow">
//       <h2 className="mb-4 text-2xl font-semibold">Submit Diagnosis</h2>

//       {message && <p className="mb-4 text-green-600">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Select Appointment</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={formData.appointmentId}
//             onChange={(e) =>
//               setFormData({ ...formData, appointmentId: e.target.value })
//             }
//           >
//             <option value="">-- Select --</option>
//             {appointments.map((appt) => (
//               <option key={appt._id} value={appt._id}>
//                 {appt.patientName} (ID: {appt.patientId}) -{" "}
//                 {new Date(appt.appointmentDate).toLocaleDateString()}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Diagnosis</label>
//           <textarea
//             className="w-full p-2 border rounded"
//             rows={3}
//             value={formData.diagnosis}
//             onChange={(e) =>
//               setFormData({ ...formData, diagnosis: e.target.value })
//             }
//             placeholder="Enter diagnosis..."
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Prescription</label>
//           <textarea
//             className="w-full p-2 border rounded"
//             rows={3}
//             value={formData.prescription}
//             onChange={(e) =>
//               setFormData({ ...formData, prescription: e.target.value })
//             }
//             placeholder="Enter prescription..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DoctorDiagnosisForm;

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
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/appointments/appointments-list",
          {
            withCredentials: true,
          }
        );

        const pending = res.data.data.filter(
          (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
        );

        setAppointments(pending);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/appointments/submitdiagnosis",
        formData,
        { withCredentials: true }
      );

      setMessage("Diagnosis submitted successfully!");
      const newEntry = {
        appointmentId: formData.appointmentId,
        diagnosis: formData.diagnosis,
        prescription: formData.prescription,
        submittedAt: new Date().toISOString(),
      };

      // ✅ Save to localStorage
      const previous = JSON.parse(localStorage.getItem("diagnosisData")) || [];
      localStorage.setItem(
        "diagnosisData",
        JSON.stringify([...previous, newEntry])
      );

      // Clear form
      setFormData({ appointmentId: "", diagnosis: "", prescription: "" });

      // Refresh appointments
      const refreshed = await axios.get(
        "http://localhost:3000/appointments/appointments-list",
        { withCredentials: true }
      );
      const updated = refreshed.data.data.filter(
        (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
      );
      setAppointments(updated);
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("Submission failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Submit Diagnosis</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Appointment</label>
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
                {appt.patientName} (ID: {appt.patientId}) -{" "}
                {new Date(appt.appointmentDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Diagnosis</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
            placeholder="Enter diagnosis..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prescription</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.prescription}
            onChange={(e) =>
              setFormData({ ...formData, prescription: e.target.value })
            }
            placeholder="Enter prescription..."
            required
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
