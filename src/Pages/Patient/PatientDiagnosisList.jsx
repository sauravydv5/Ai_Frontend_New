// // PatientDiagnosisList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PatientDiagnosisList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDiagnosis = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/appointments/getdigonsisresult",
//           {
//             withCredentials: true,
//           }
//         );
//         setAppointments(res.data.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load diagnosis.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDiagnosis();
//   }, []);

//   if (loading) return <p className="mt-10 text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-5xl p-6 mx-auto bg-white rounded shadow">
//       <h2 className="mb-6 text-2xl font-semibold">My Diagnoses</h2>

//       {appointments.length === 0 ? (
//         <p>No completed appointments found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border">
//             <thead className="text-left bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Doctor</th>
//                 <th className="p-2 border">Date</th>
//                 <th className="p-2 border">Reason</th>
//                 <th className="p-2 border">Diagnosis</th>
//                 <th className="p-2 border">Prescription</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appt) => (
//                 <tr key={appt._id} className="hover:bg-gray-50">
//                   <td className="p-2 border">
//                     {appt.doctor.firstName} {appt.doctor.lastName}
//                   </td>
//                   <td className="p-2 border">
//                     {new Date(appt.appointmentDate).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border">{appt.reason}</td>
//                   <td className="p-2 border">{appt.diagnosis}</td>
//                   <td className="p-2 border">{appt.prescription}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientDiagnosisList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientDiagnosisList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/appointments/getdigonsisresult",
          { withCredentials: true }
        );
        setAppointments(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load diagnosis.");
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosis();
  }, []);

  if (loading)
    return (
      <p className="mt-10 text-lg text-center text-gray-500">Loading...</p>
    );

  if (error) return <p className="text-lg text-center text-red-500">{error}</p>;

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
        🩺 My Diagnoses & Prescriptions
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          You don't have any diagnosis records yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
          <table className="min-w-full text-sm text-gray-700 bg-white">
            <thead className="font-semibold text-blue-800 uppercase bg-blue-50 text-md">
              <tr>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Diagnosis</th>
                <th className="px-4 py-3 text-left">Prescription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {appt.doctor.firstName} {appt.doctor.lastName}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{appt.reason}</td>
                  <td className="px-4 py-3 text-gray-800 whitespace-pre-wrap">
                    {appt.diagnosis}
                  </td>
                  <td className="px-4 py-3 text-green-700 whitespace-pre-wrap">
                    {appt.prescription}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientDiagnosisList;
