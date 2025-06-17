// NEWWW

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  AlertCircle,
  User,
} from "lucide-react";
import { BASE_URL } from "../../utils/constant";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // ✅ Use JWT token from localStorage

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(BASE_URL + "/appointments/my-appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load your appointments.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(BASE_URL + "/doctor/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctor list:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Unauthorized. Please login again.");
      setLoading(false);
      return;
    }

    Promise.all([fetchMyAppointments(), fetchDoctors()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const getDoctorById = (id) => doctors.find((doc) => doc._id === id);

  if (loading)
    return (
      <p className="py-10 text-center text-gray-600 animate-pulse">
        Loading appointments...
      </p>
    );

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto mt-8 bg-white shadow-md md:px-8 lg:px-10 rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-700 md:text-3xl md:text-left">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not made any appointments yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => {
            const doctor = getDoctorById(
              typeof appt.doctor === "string" ? appt.doctor : appt.doctor?._id
            );

            return (
              <div
                key={appt._id}
                className="p-5 space-y-3 transition-shadow border shadow bg-gray-50 rounded-xl hover:shadow-lg"
              >
                {doctor?.photoUrl && (
                  <div className="flex justify-center">
                    <img
                      src={doctor.photoUrl}
                      alt="Doctor"
                      className="object-cover w-20 h-20 border border-gray-300 rounded-full shadow-sm"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-800 md:text-lg">
                    <User className="inline w-4 h-4 mr-1 text-blue-600" />
                    Dr. {doctor ? doctor.firstName : "Doctor not found"}
                  </h4>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full text-white ${
                      appt.status === "accepted"
                        ? "bg-green-600"
                        : appt.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <Stethoscope className="inline w-4 h-4 mr-1 text-purple-600" />
                  Speciality: {doctor?.speciality || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  <CalendarDays className="inline w-4 h-4 mr-1 text-green-600" />
                  {new Date(appt.appointmentDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <Clock className="inline w-4 h-4 mr-1 text-orange-600" />
                  {appt.appointmentTime}
                </p>

                <p className="text-sm text-gray-600">
                  <AlertCircle className="inline w-4 h-4 mr-1 text-red-600" />
                  Reason: {appt.reason}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
