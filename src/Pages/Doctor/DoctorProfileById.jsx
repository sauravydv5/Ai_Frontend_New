import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

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
        setError("Failed to fetch doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBack = () => {
    navigate("/patient-dashboard/doctor-list");
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-4 py-20 bg-gray-100 md:px-24">
      <div className="max-w-6xl p-12 mx-auto bg-white shadow-lg rounded-3xl">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Doctor Photo */}
          <div className="flex justify-center">
            <img
              src={
                doctor.photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
              }
              alt="Doctor"
              className="object-cover border-4 border-indigo-600 rounded-full shadow-md w-72 h-72"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold text-indigo-700">
              Dr. {doctor.firstName}
              {/* {doctor.lastName} */}
            </h1>

            <p className="text-lg text-gray-700">
              <strong>Speciality:</strong>{" "}
              <span className="inline-block px-3 py-1 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded-full">
                {doctor.speciality}
              </span>
            </p>

            <p className="text-lg text-gray-700">
              <strong>Experience:</strong> {doctor.experienceYears} years
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {doctor.emailId}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Phone:</strong> {doctor.phone}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Clinic Address:</strong> {doctor.clinicAddress}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Available Timings:</strong> {doctor.availableFrom} -{" "}
              {doctor.availableTo}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-green-600">
                {doctor.status}
              </span>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 text-white transition duration-300 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            ← Back to Doctor List
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileById;
