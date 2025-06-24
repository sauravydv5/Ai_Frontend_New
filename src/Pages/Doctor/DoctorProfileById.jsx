import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { Loader2 } from "lucide-react";

const DoctorProfileById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/doctor/profile/${id}`, {
          withCredentials: true,
        });
        setDoctor(res.data.doctor);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBack = () => {
    navigate("/patient-dashboard/doctor-list");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-sm text-indigo-700">Loading Doctor Profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-20 bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <div className="max-w-6xl p-10 mx-auto transition-all duration-500 border shadow-2xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-indigo-200">
        {/* Back Button Moved Here */}
        <div className="mb-6 text-left">
          <button
            onClick={handleBack}
            className="px-5 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
          >
            ← Back to Doctor List
          </button>
        </div>

        <div className="flex flex-col items-center gap-10 md:flex-row">
          {/* Doctor Photo */}
          <div className="flex justify-center">
            <img
              src={
                doctor.photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
              }
              alt="Doctor"
              className="object-cover transition-transform duration-300 border-4 border-indigo-500 rounded-full shadow-xl w-72 h-72 hover:scale-105"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-5 text-gray-800">
            <h1 className="text-4xl font-extrabold text-indigo-800 drop-shadow">
              Dr. {doctor.firstName}
            </h1>

            <div className="grid grid-cols-1 gap-4 text-lg sm:grid-cols-2">
              <Info label="Speciality" value={doctor.speciality} />
              <Info
                label="Experience"
                value={`${doctor.experienceYears} years`}
              />
              <Info label="Email" value={doctor.emailId} />
              <Info label="Phone" value={doctor.phone} />
              <Info label="Clinic Address" value={doctor.clinicAddress} />
              <Info
                label="Available Timings"
                value={`${doctor.availableFrom} - ${doctor.availableTo}`}
              />
              <Info
                label="Status"
                value={
                  <span
                    className={`font-semibold ${
                      doctor.status === "approved"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {doctor.status}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="p-4 transition-all duration-300 border border-gray-200 shadow bg-white/90 rounded-xl hover:shadow-lg">
    <p className="text-sm font-semibold text-indigo-700">{label}</p>
    <p className="text-base font-medium">{value || "N/A"}</p>
  </div>
);

export default DoctorProfileById;
