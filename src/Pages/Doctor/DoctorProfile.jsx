import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/doctor/list");
        const doctors = res.data.doctors;

        if (!doctors || doctors.length === 0) {
          setError("No accepted doctors found.");
          return;
        }

        setDoctor(doctors[0]); // Show the first doctor from list
      } catch (err) {
        setError("Failed to load doctors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorList();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        Loading doctor profile...
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
        {error || "Doctor not found."}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-blue-800">
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>
          <p className="mb-4 text-lg italic text-gray-600">
            {doctor.speciality}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6 text-gray-700 md:grid-cols-2">
          <div>
            <p className="font-semibold">Email:</p>
            <p>{doctor.emailId}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{doctor.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Experience:</p>
            <p>{doctor.experienceYears} years</p>
          </div>
          <div>
            <p className="font-semibold">Clinic Address:</p>
            <p>{doctor.clinicAddress}</p>
          </div>
          <div>
            <p className="font-semibold">Available From:</p>
            <p>{doctor.availableFrom}</p>
          </div>
          <div>
            <p className="font-semibold">Available To:</p>
            <p>{doctor.availableTo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DoctorProfile = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDoctorList = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/doctor/list");
//         const doctors = res.data.doctors;

//         if (!doctors || doctors.length === 0) {
//           setError("No accepted doctors found.");
//           return;
//         }

//         // 🟢 You can change this logic to select doctor by ID, index, etc.
//         setDoctor(doctors[0]); // currently just showing the first doctor
//       } catch (err) {
//         setError("Failed to load doctors.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctorList();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
//         Loading doctor profile...
//       </div>
//     );
//   }

//   if (error || !doctor) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
//         {error || "Doctor not found."}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-blue-100 to-white">
//       <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
//         <div className="text-center">
//           <img
//             src={doctor.PhotoUrl}
//             alt="Doctor"
//             className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md object-cover"
//           />
//           <h2 className="mb-2 text-3xl font-bold text-blue-800">
//             Dr. {doctor.firstName} {doctor.lastName}
//           </h2>
//           <p className="mb-4 text-lg italic text-gray-600">
//             {doctor.speciality}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-6 mt-6 text-gray-700 md:grid-cols-2">
//           <div>
//             <p className="font-semibold">Email:</p>
//             <p>{doctor.emailId}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Phone:</p>
//             <p>{doctor.phone}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Experience:</p>
//             <p>{doctor.experienceYears} years</p>
//           </div>
//           <div>
//             <p className="font-semibold">Clinic Address:</p>
//             <p>{doctor.clinicAddress}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Available From:</p>
//             <p>{doctor.availableFrom}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Available To:</p>
//             <p>{doctor.availableTo}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;
