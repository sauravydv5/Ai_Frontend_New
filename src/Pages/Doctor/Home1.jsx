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

  // 👨‍⚕️ Fetch doctor info
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/doctor/profile/view`, {
          withCredentials: true,
        });
        console.log("Doctor info:", data); // for debug
        setDoctor(data.data); // ← Corrected: use data.data if backend sends { success: true, data: { doctorData } }
      } catch (err) {
        console.error("Doctor info fetch failed", err);
      }
    };
    fetchDoctor();
  }, []);

  // 📅 Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/appointments/appointments-list`,
          {
            withCredentials: true,
          }
        );
        setAppointments(data.data || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  // 🔁 Rotate smart tips every 10 seconds
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
    <div className="min-h-[90vh] bg-gray-50 p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="flex flex-col justify-between mb-8 sm:flex-row sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-xl font-semibold text-green-800 sm:text-2xl">
            Welcome, Dr. {doctor?.firstName || "Doctor"} 👨‍⚕️
          </h1>
          <p className="text-sm text-gray-500">Today is {todayDateStr}</p>
        </div>
        <img
          src={
            doctor?.photoUrl && doctor.photoUrl !== "null"
              ? doctor.photoUrl
              : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
          }
          alt="Doctor Avatar"
          className="object-cover w-12 h-12 rounded-full shadow sm:w-14 sm:h-14"
        />
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Appointments",
            value: appointments.length,
            color: "from-green-200 to-green-100",
          },
          {
            label: "Today's Appointments",
            value: todaysAppointments.length,
            color: "from-sky-200 to-sky-100",
          },
          {
            label: "Pending Diagnoses",
            value: pendingDiagnoses.length,
            color: "from-pink-200 to-rose-100",
          },
          {
            label: "Patient Rating",
            value: "4.7 ★",
            color: "from-yellow-100 to-orange-100",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`p-4 sm:p-5 rounded-2xl shadow bg-gradient-to-br ${card.color}`}
          >
            <h4 className="text-sm text-gray-700 sm:text-base">{card.label}</h4>
            <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Appointments Section */}
      <div className="p-4 mb-10 bg-white border shadow sm:p-6 rounded-2xl">
        <h2 className="mb-4 font-semibold text-green-700 text-md sm:text-lg">
          📋 Today's Accepted Appointments
        </h2>
        {todaysAppointments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No accepted appointments for today.
          </p>
        ) : (
          <ul className="overflow-y-auto divide-y divide-gray-200 max-h-80">
            {todaysAppointments.map((a, i) => (
              <li
                key={i}
                className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
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

      {/* Doctor's Corner - Smart Tip */}
      <div className="p-4 text-green-800 border border-green-200 shadow sm:p-5 bg-gradient-to-br from-green-100 to-sky-100 rounded-2xl">
        <h3 className="mb-1 font-semibold text-md">🧠 Doctor's Corner</h3>
        <p className="text-sm transition duration-300">{smartTips[tipIndex]}</p>
      </div>
    </div>
  );
};

export default Home1;
