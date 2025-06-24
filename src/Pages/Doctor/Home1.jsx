import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const Home1 = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);

  const smartTips = [
    "Medicine is a science of uncertainty and an art of probability. – William Osler",
    "Listen to your patients—they are telling you the diagnosis.",
    "Prevention is better than cure.",
    "Stay calm under pressure—it builds trust.",
    "Compassion heals more than medicine.",
    "Be curious—it leads to better diagnoses.",
    "Collaboration with colleagues saves lives.",
    "Document everything—it protects both doctor and patient.",
  ];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${BASE_URL}/doctor/profile/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctor(data.data);
      } catch (err) {
        console.error("Doctor info fetch failed", err);
      }
    };
    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${BASE_URL}/appointments/appointments-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(data.data || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % smartTips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const todayDateStr = new Date().toISOString().split("T")[0];

  const todaysAppointments = appointments.filter(
    (a) =>
      a.status === "accepted" && a.appointmentDate?.startsWith(todayDateStr)
  );

  const pendingDiagnoses = appointments.filter(
    (a) => a.status === "accepted" && (!a.diagnosis || !a.prescription)
  );

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6">
      {/* Welcome */}
      <div className="flex flex-col justify-between mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-800">
            Welcome, Dr. {doctor?.firstName || "Doctor"} 👨‍⚕️
          </h1>
          <p className="text-sm text-gray-600">Today is {todayDateStr}</p>
        </div>
        <div className="relative">
          <img
            src={
              doctor?.photoUrl && doctor.photoUrl !== "null"
                ? doctor.photoUrl
                : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            }
            alt="Doctor Avatar"
            className="object-cover transition duration-300 rounded-full shadow-xl w-14 h-14 ring-4 ring-blue-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Appointments",
            value: appointments.length,
            color: "from-green-300 to-green-100",
          },
          {
            label: "Today's Appointments",
            value: todaysAppointments.length,
            color: "from-blue-300 to-sky-100",
          },
          {
            label: "Pending Diagnoses",
            value: pendingDiagnoses.length,
            color: "from-rose-300 to-pink-100",
          },
          {
            label: "Patient Rating",
            value: "4.7 ★",
            color: "from-yellow-200 to-orange-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`transform hover:scale-105 transition-all duration-300 p-5 rounded-2xl shadow-xl bg-gradient-to-br ${item.color}`}
          >
            <h4 className="text-sm font-medium text-gray-700">{item.label}</h4>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="p-6 mb-10 bg-white border shadow-xl rounded-2xl">
        <h2 className="mb-4 text-lg font-bold text-green-700">
          📋 Today's Accepted Appointments
        </h2>
        {todaysAppointments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No accepted appointments for today.
          </p>
        ) : (
          <ul className="overflow-y-auto divide-y divide-gray-200 max-h-80 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
            {todaysAppointments.map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-3 sm:py-4"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {a.patient?.firstName || "Patient"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {a.appointmentTime} • {a.reason || "General Checkup"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Smart Tip */}
      <div className="relative p-6 text-green-900 border border-green-200 shadow-inner bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl">
        <h3 className="mb-2 font-bold text-md">🧠 Doctor’s Corner</h3>
        <blockquote className="text-sm italic transition-opacity duration-500">
          “{smartTips[tipIndex]}”
        </blockquote>
        <div className="absolute text-xs text-gray-400 bottom-3 right-5">
          Auto rotates every 10s
        </div>
      </div>
    </div>
  );
};

export default Home1;
