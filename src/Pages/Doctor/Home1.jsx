import React, { useEffect, useState } from "react";

const Home1 = () => {
  const doctor = JSON.parse(localStorage.getItem("doctor")) || {
    firstName: "Doctor",
  };
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments from localStorage for now
    const stored = JSON.parse(localStorage.getItem("doctorAppointments")) || [];
    setAppointments(stored);
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-[90vh] bg-gray-50 p-6">
      {/* Welcome */}
      <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-green-800">
            Welcome, Dr. {doctor.firstName} 👨‍⚕️
          </h1>
          <p className="text-sm text-gray-500">Today is {today}</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img
            src={
              doctor.picture ||
              "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            }
            alt="Doctor Avatar"
            className="rounded-full shadow w-14 h-14"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Appointments",
            value: appointments.length,
            color: "from-green-200 to-green-100",
          },
          {
            label: "Today's Appointments",
            value: appointments.filter((a) => a.date === today).length,
            color: "from-sky-200 to-sky-100",
          },
          {
            label: "Pending Diagnoses",
            value: appointments.filter((a) => !a.diagnosis).length,
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
            className={`p-5 rounded-2xl shadow bg-gradient-to-br ${card.color}`}
          >
            <h4 className="text-sm text-gray-700">{card.label}</h4>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Live Appointments */}
      <div className="p-6 mb-10 bg-white border shadow rounded-2xl">
        <h2 className="mb-4 text-lg font-semibold text-green-700">
          📋 Today's Appointments
        </h2>
        {appointments.length === 0 ? (
          <p className="text-sm text-gray-500">No appointments scheduled.</p>
        ) : (
          <ul className="overflow-y-auto divide-y divide-gray-200 max-h-80">
            {appointments
              .filter((a) => a.date === today)
              .map((a, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-800">{a.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {a.time} • {a.reason || "General Checkup"}
                    </p>
                  </div>
                  <button className="px-3 py-1 text-sm text-white bg-green-600 shadow rounded-xl hover:bg-green-700">
                    Start
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Smart Tip / Quote */}
      <div className="p-5 text-green-800 border border-green-200 shadow bg-gradient-to-br from-green-100 to-sky-100 rounded-2xl">
        <h3 className="mb-1 font-semibold text-md">🧠 Doctor's Corner</h3>
        <p className="text-sm">
          “Medicine is a science of uncertainty and an art of probability.” –
          William Osler
        </p>
      </div>
    </div>
  );
};

export default Home1;
