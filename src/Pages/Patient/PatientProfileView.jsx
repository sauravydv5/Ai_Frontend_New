// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Loader } from "lucide-react";

// const PatientProfileView = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/patient/updatedprofile/view",
//         {
//           withCredentials: true,
//         }
//       );
//       setProfile(res.data?.data || null);
//     } catch (error) {
//       console.error("Error fetching patient profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh] text-teal-600">
//         <Loader className="w-8 h-8 animate-spin" />
//         <span className="ml-3 text-lg font-semibold">Loading profile...</span>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="mt-10 text-center text-red-600">
//         <p>Profile data not available.</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="max-w-3xl p-8 mx-auto mt-12 bg-white border border-teal-100 shadow-lg rounded-2xl"
//     >
//       <h2 className="mb-8 text-3xl font-bold text-center text-teal-700">
//         Patient Profile
//       </h2>
//       <div className="grid grid-cols-1 gap-6 text-lg text-gray-800 md:grid-cols-2">
//         <div>
//           <strong>Full Name:</strong> {profile.firstName}
//         </div>
//         <div>
//           <strong>Email:</strong> {profile.emailId}
//         </div>
//         <div>
//           <strong>Phone:</strong> {profile.phone}
//         </div>
//         <div>
//           <strong>Gender:</strong> {profile.gender}
//         </div>
//         <div>
//           <strong>Address:</strong> {profile.address}
//         </div>
//         <div>
//           <strong>Paid:</strong> {profile.isPaid ? "✅ Yes" : "❌ No"}
//         </div>
//         <div>
//           <strong>Expired:</strong> {profile.isExpired ? "❌ Yes" : "✅ No"}
//         </div>
//         <div>
//           <strong>Created At:</strong>{" "}
//           {new Date(profile.createdAt).toLocaleString()}
//         </div>
//         <div>
//           <strong>Last Updated:</strong>{" "}
//           {new Date(profile.updatedAt).toLocaleString()}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default PatientProfileView;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const PatientProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/patient/updatedprofile/view",
        {
          withCredentials: true,
        }
      );
      setProfile(res.data?.data || null);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-teal-600">
        <Loader className="w-8 h-8 animate-spin" />
        <span className="ml-3 text-lg font-semibold">Loading profile...</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mt-10 text-center text-red-600">
        <p>Profile data not available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl p-8 mx-auto mt-12 bg-white border border-teal-100 shadow-lg rounded-2xl"
    >
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
        Patient Profile
      </h2>

      {/* ✅ Profile Image */}
      <div className="flex justify-center mb-8">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt="Profile"
            className="object-cover w-32 h-32 border-4 border-teal-500 rounded-full shadow-md"
          />
        ) : (
          <div className="flex items-center justify-center w-32 h-32 text-white bg-gray-400 rounded-full shadow">
            No Image
          </div>
        )}
      </div>

      {/* ✅ Info Grid */}
      <div className="grid grid-cols-1 gap-6 text-lg text-gray-800 md:grid-cols-2">
        <div>
          <strong>Full Name:</strong> {profile.firstName}
        </div>
        <div>
          <strong>Email:</strong> {profile.emailId}
        </div>
        <div>
          <strong>Phone:</strong> {profile.phone}
        </div>
        <div>
          <strong>Gender:</strong> {profile.gender}
        </div>
        {/* <div>
          <strong>Age:</strong> {profile.age}
        </div> */}
        <div>
          <strong>Address:</strong> {profile.address}
        </div>
        <div>
          <strong>Paid:</strong> {profile.isPaid ? "✅ Yes" : "❌ No"}
        </div>
        <div>
          <strong>Expired:</strong> {profile.isExpired ? "❌ Yes" : "✅ No"}
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(profile.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Last Updated:</strong>{" "}
          {new Date(profile.updatedAt).toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
};

export default PatientProfileView;
