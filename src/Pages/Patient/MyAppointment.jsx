import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  AlertCircle,
  User,
} from "lucide-react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch appointments from backend
  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/appointments/my-appointments",
        {
          withCredentials: true,
        }
      );
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get doctor list from localStorage
    const doctorList = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(doctorList);

    fetchMyAppointments();
  }, []);

  // Helper: Find doctor by appointment.doctor ID (safe for object or string)
  const getDoctorFromLocal = (docRef) => {
    const id = typeof docRef === "string" ? docRef : docRef?._id;
    return doctors.find((doc) => doc._id === id) || {};
  };

  if (loading)
    return (
      <p className="py-10 text-center text-gray-600 animate-pulse">
        Loading appointments...
      </p>
    );

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl px-6 py-10 mx-auto mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="mb-6 text-3xl font-bold text-blue-700">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">You have not made any appointments yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {appointments.map((appt) => {
            const doctor = getDoctorFromLocal(appt.doctor);

            return (
              <div
                key={appt._id}
                className="p-6 space-y-3 transition-all border shadow-sm bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800">
                    <User className="inline-block w-4 h-4 mr-1" />
                    Dr. {doctor.firstName || "Not Found"}
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
                  <Stethoscope className="inline-block w-4 h-4 mr-1" />
                  Speciality: {doctor.speciality || "Not Found"}
                </p>

                <p className="text-sm text-gray-600">
                  <CalendarDays className="inline-block w-4 h-4 mr-1" />
                  {new Date(appt.appointmentDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  {appt.appointmentTime}
                </p>

                <p className="text-sm text-gray-600">
                  <AlertCircle className="inline-block w-4 h-4 mr-1" />
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
