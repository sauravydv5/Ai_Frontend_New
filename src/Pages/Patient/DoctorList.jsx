import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/patient/applied-doctors",
        {
          withCredentials: true,
        }
      );
      setDoctors(res.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching doctors:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChat = (doctor) => {
    // For now alert, but you can navigate to chat page like below
    // navigate(`/chat/${doctor._id}`);
    alert(`Initiating chat with Dr. ${doctor.name}`);
  };

  const handleBookAppointment = (doctor) => {
    // Navigate to booking page with doctor id
    navigate("/book-appointment/");
  };

  const handleViewProfile = (doctor) => {
    // Navigate to doctor profile page
    navigate(`/doctor-profile/${doctor._id}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-50 to-white">
      <h1 className="mb-10 text-4xl font-extrabold text-center text-indigo-800">
        Our Trusted Doctors
      </h1>

      {loading ? (
        <p className="text-lg text-center text-gray-500">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-lg text-center text-red-500">
          No doctors available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-6 transition-transform duration-200 bg-white border shadow-xl rounded-2xl hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <img
                  src={doc.picture || "https://via.placeholder.com/100"}
                  alt={doc.name}
                  className="w-20 h-20 border-2 border-indigo-500 rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {doc.name}
                  </h2>
                  <span className="inline-block px-3 py-1 mt-1 text-xs font-medium text-white bg-green-600 rounded-full">
                    {doc.speciality}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>
                  <strong>📍 Clinic:</strong> {doc.clinicAddress}
                </p>
                <p>
                  <strong>📞 Phone:</strong> {doc.phone}
                </p>
                <p>
                  <strong>📧 Email:</strong> {doc.email}
                </p>
                <p>
                  <strong>⏰ Available:</strong> {doc.availableFrom} -{" "}
                  {doc.availableTo}
                </p>
              </div>

              <div className="flex justify-between mt-4 space-x-2">
                <button
                  onClick={() => handleViewProfile(doc)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleBookAppointment(doc)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => handleChat(doc)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Chat 💬
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
