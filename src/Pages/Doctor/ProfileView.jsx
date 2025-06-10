import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor");
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
        No doctor profile found. Please login or apply.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
        <div className="flex flex-col items-center">
          <img
            src={doctor?.picture || "/default-doctor.png"}
            alt="Doctor"
            className="object-cover w-32 h-32 mb-4 border-4 border-blue-300 rounded-full shadow-md"
          />
          <h2 className="mb-1 text-2xl font-bold text-blue-800">
            {doctor.name}
          </h2>
          <p className="mb-4 italic text-gray-600">{doctor.speciality}</p>
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

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/apply-doctor")}
            className="px-6 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Apply as a Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
