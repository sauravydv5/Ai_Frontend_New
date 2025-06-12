// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppointmentBooking = () => {
//   const [formData, setFormData] = useState({
//     doctor: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     reason: "",
//   });
//   console.log(formData);
//   const [doctors, setDoctors] = useState([]);
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch doctors on mount
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/patient/applied-doctors",
//           {
//             withCredentials: true,
//           }
//         );

//         const data = res.data?.data || [];
//         if (Array.isArray(data)) {
//           setDoctors(data);
//         } else {
//           setDoctors([]);
//         }
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//         setDoctors([]);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   console.log(doctors);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/appointments/appointmentCreate",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       setResponse({ success: true, message: res.data.message });
//       setFormData({
//         doctor: "",
//         appointmentDate: "",
//         appointmentTime: "",
//         reason: "",
//       });
//     } catch (error) {
//       setResponse({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong",
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
//           name="doctor"
//           value={formData.doctor}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//           required
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((doc) => (
//             <option key={doc._id} value={doc._id}>
//               {doc.name} ({doc.speciality})
//             </option>
//           ))}
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

  // Load doctors from localStorage
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    console.log("Loaded Doctors:", storedDoctors); // Debug
    setDoctors(storedDoctors);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name}:`, value); // Debug
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Booking Data:", formData); // Debug
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
        {/* Doctor Selection */}
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={String(doc._id)}>
              {doc.firstName || doc.name} ({doc.speciality})
            </option>
          ))}
        </select>

        {/* Appointment Date */}
        <input
          type="date"
          name="appointmentDate"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        {/* Appointment Time */}
        <input
          type="time"
          name="appointmentTime"
          className="w-full p-3 border rounded-lg"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />

        {/* Reason */}
        <textarea
          name="reason"
          rows="3"
          placeholder="Reason for appointment"
          className="w-full p-3 border rounded-lg"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {/* Response Message */}
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
