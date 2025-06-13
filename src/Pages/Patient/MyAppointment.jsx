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
  const [feedbackVisible, setFeedbackVisible] = useState({});

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get(BASE_URL + "/appointments/my-appointments", {
        withCredentials: true,
      });
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const doctorList = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(doctorList);
    fetchMyAppointments();
  }, []);

  const getDoctorFromLocal = (docRef) => {
    const id = typeof docRef === "string" ? docRef : docRef?._id;
    return doctors.find((doc) => doc._id === id) || {};
  };

  // const toggleFeedback = (id) => {
  //   setFeedbackVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

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
            const doctor = getDoctorFromLocal(appt.doctor);
            return (
              <div
                key={appt._id}
                className="p-5 space-y-3 transition-shadow border shadow bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-800 md:text-lg">
                    <User className="inline w-4 h-4 mr-1 text-blue-600" />
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
                  <Stethoscope className="inline w-4 h-4 mr-1 text-purple-600" />
                  Speciality: {doctor.speciality || "Not Found"}
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

                {appt.status === "accepted" && (
                  <>
                    {/* <button
                      onClick={() => toggleFeedback(appt._id)}
                      className="px-4 py-1 mt-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                    >
                      {feedbackVisible[appt._id]
                        ? "Cancel Feedback"
                        : "Give Feedback"}
                    </button> */}

                    {feedbackVisible[appt._id] && (
                      <FeedbackForm
                        appointmentId={appt._id}
                        onCancel={() => toggleFeedback(appt._id)}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
