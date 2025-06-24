import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // spinner
import { BASE_URL } from "../../utils/constant";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/doctor/profile/view`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const doctorData = res.data.data;
        if (!doctorData || !doctorData.firstName) {
          setError("Doctor profile not found.");
          return;
        }

        setDoctor(doctorData);
      } catch (err) {
        setError("Failed to load doctor profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-sm font-medium text-blue-700">
            Loading Doctor Profile...
          </p>
        </div>
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
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="relative max-w-4xl p-8 mx-auto transition-all duration-500 ease-in-out border border-blue-200 shadow-2xl bg-white/60 backdrop-blur-xl rounded-3xl hover:shadow-blue-300">
        {/* Top Avatar Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          {doctor.photoUrl ? (
            <img
              src={doctor.photoUrl}
              alt="Doctor"
              className="object-cover w-32 h-32 mb-4 transition border-4 border-blue-400 rounded-full shadow-lg hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 mb-4 text-xl font-bold text-white bg-gray-400 rounded-full">
              No Photo
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-blue-800 drop-shadow">
            Dr. {doctor.firstName}
          </h2>
          <p className="text-lg italic text-gray-600">
            {doctor.speciality || "General Physician"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-6 text-gray-800 sm:grid-cols-2">
          <Info label="Email" value={doctor.emailId} />
          <Info label="Phone" value={doctor.phone} />
          <Info label="Experience" value={`${doctor.experienceYears} years`} />
          <Info label="Clinic Address" value={doctor.clinicAddress} />
          <Info label="Available From" value={doctor.availableFrom} />
          <Info label="Available To" value={doctor.availableTo} />
          <Info label="Status" value={doctor.status} />
          {doctor.comment && (
            <Info label="Admin Comment" value={doctor.comment} />
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="p-4 transition duration-300 border border-gray-100 shadow-md bg-white/80 rounded-xl hover:shadow-lg">
    <p className="text-sm font-semibold text-blue-700">{label}</p>
    <p className="text-base font-medium text-gray-900">{value || "N/A"}</p>
  </div>
);

export default DoctorProfile;
