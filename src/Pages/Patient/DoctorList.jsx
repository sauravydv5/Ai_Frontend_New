import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(storedDoctors);
    setLoading(false);
  }, []);

  const handleBookAppointment = (doctor) => {
    navigate("/patient-dashboard/book-appointment");
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
      ) : doctors.length === 0 ? (
        <p className="text-lg text-center text-red-500">
          No doctors available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-5 transition-transform transform bg-white border shadow-lg rounded-2xl hover:shadow-xl hover:scale-105"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Dr. {doc.firstName} {doc.lastName}
                </h2>
                <span className="inline-block px-3 py-1 mt-2 text-xs font-medium text-white bg-green-600 rounded-full">
                  {doc.speciality}
                </span>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>
                  <strong>📍 Clinic:</strong> {doc.clinicAddress}
                </p>
                <p>
                  <strong>📞 Phone:</strong> {doc.phone}
                </p>
                <p>
                  <strong>📧 Email:</strong> {doc.emailId}
                </p>
                <p>
                  <strong>⏰ Available:</strong> {doc.availableFrom} -{" "}
                  {doc.availableTo}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-3 mt-5 sm:flex-row">
                <button
                  onClick={() => handleViewProfile(doc)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleBookAppointment(doc)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
