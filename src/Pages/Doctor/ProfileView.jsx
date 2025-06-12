import React, { useEffect, useState } from "react";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctors");
    if (storedDoctor) {
      try {
        const parsed = JSON.parse(storedDoctor);
        // If it's an array (e.g. [{...}]), take the first doctor
        const singleDoctor = Array.isArray(parsed) ? parsed[0] : parsed;
        setDoctor(singleDoctor);
      } catch (err) {
        console.error("Failed to parse doctor from localStorage:", err);
      }
    }
  }, []);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
        No doctor profile found in localStorage.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-blue-800">
            Dr. {doctor.firstName}
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
