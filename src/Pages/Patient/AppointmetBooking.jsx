// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AppointmentBooking = () => {
//   const { doctorId: routeDoctorId } = useParams(); // optional: pre-select doctor
//   const [formData, setFormData] = useState({
//     doctorId: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     reason: "",
//   });

//   const [doctors, setDoctors] = useState([]);
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch doctors on component mount
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/patient/applied-doctors",
//           {
//             withCredentials: true,
//           }
//         );

//         // Ensure data is an array
//         const doctorList = Array.isArray(res.data.data) ? res.data.data : [];

//         setDoctors(doctorList);

//         // If route has doctorId, pre-fill it
//         if (routeDoctorId) {
//           const found = doctorList.find((doc) => doc._id === routeDoctorId);
//           if (found) {
//             setFormData((prev) => ({
//               ...prev,
//               doctorId: found._id,
//             }));
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch doctors:", error);
//         setDoctors([]); // prevent map error
//       }
//     };

//     fetchDoctors();
//   }, [routeDoctorId]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/appointments/appointmentCreate",
//         formData,
//         { withCredentials: true }
//       );
//       setResponse(res.data);
//     } catch (error) {
//       setResponse({
//         success: false,
//         message: error.response?.data?.message || error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
//       <h2 className="mb-6 text-2xl font-bold text-gray-800">
//         Book an Appointment
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <select
//           name="doctorId"
//           value={formData.doctorId}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//           required
//         >
//           <option value="" disabled>
//             Select Doctor
//           </option>
//           {Array.isArray(doctors) && doctors.length > 0 ? (
//             doctors.map((doc) => (
//               <option key={doc._id} value={doc._id}>
//                 {doc.name} ({doc.speciality})
//               </option>
//             ))
//           ) : (
//             <option disabled>No doctors found</option>
//           )}
//         </select>

//         <input
//           type="date"
//           name="appointmentDate"
//           className="w-full p-3 border rounded-lg"
//           value={formData.appointmentDate}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="time"
//           name="appointmentTime"
//           className="w-full p-3 border rounded-lg"
//           value={formData.appointmentTime}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="reason"
//           rows="3"
//           placeholder="Reason for appointment"
//           className="w-full p-3 border rounded-lg"
//           value={formData.reason}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           {loading ? "Booking..." : "Book Appointment"}
//         </button>
//       </form>

//       {response && (
//         <div
//           className={`mt-4 p-4 rounded-lg ${
//             response.success
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {response.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentBooking;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/patient/applied-doctors",
          {
            withCredentials: true,
          }
        );

        const data = res.data?.data || [];
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/appointments/appointmentCreate",
        formData,
        {
          withCredentials: true,
        }
      );
      setResponse({ success: true, message: res.data.message });
      setFormData({
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
    } catch (error) {
      setResponse({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.speciality})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="appointmentTime"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          rows="3"
          placeholder="Reason for appointment"
          className="w-full p-3 border rounded-lg"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {response && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            response.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
