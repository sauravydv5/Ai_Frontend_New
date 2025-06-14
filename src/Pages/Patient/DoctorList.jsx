import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(BASE_URL + "/doctor/list");
        // ✅ Filter only accepted doctors
        const acceptedDoctors = (res.data.doctors || []).filter(
          (doc) => doc.status === "Accepted"
        );
        setDoctors(acceptedDoctors);
      } catch (err) {
        setError("Failed to fetch doctors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctor) => {
    navigate("/patient-dashboard/book-appointment", { state: { doctor } });
  };

  const handleViewProfile = (doctor) => {
    navigate(`/doctor-profile/${doctor._id}`);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-white">
      <h1 className="mb-8 text-3xl font-extrabold text-center text-indigo-800 md:text-4xl">
        Our Trusted Doctors
      </h1>

      {loading ? (
        <p className="text-lg text-center text-gray-500">Loading doctors...</p>
      ) : error ? (
        <p className="text-lg text-center text-red-500">{error}</p>
      ) : doctors.length === 0 ? (
        <p className="text-lg text-center text-red-500">
          No accepted doctors available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="flex flex-col justify-between p-6 bg-white border shadow-lg rounded-2xl hover:shadow-xl transition-transform transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    doc.photoUrl && doc.photoUrl !== "null"
                      ? doc.photoUrl
                      : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                  }
                  alt="Doctor"
                  className="object-cover w-16 h-16 rounded-full shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                    Dr. {doc.firstName} {doc.lastName}
                  </h2>
                  <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-white bg-green-600 rounded-full">
                    {doc.speciality}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <strong>📍 Clinic:</strong> {doc.clinicAddress}
                </p>
                <p>
                  <strong>📞 Phone:</strong> {doc.phone}
                </p>
                <p className="break-all">
                  <strong>📧 Email:</strong> {doc.emailId}
                </p>
                <p>
                  <strong>⏰ Available:</strong> {doc.availableFrom} -{" "}
                  {doc.availableTo}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:justify-between">
                <button
                  onClick={() => handleViewProfile(doc)}
                  className="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 sm:w-auto"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleBookAppointment(doc)}
                  className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 sm:w-auto"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
