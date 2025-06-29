// NEW CODE

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";

const healthTips = [
  /* same as before */
];
const motivationalQuotes = [
  /* same as before */
];

const Home = () => {
  const [user, setUser] = useState({ firstName: "User", photoUrl: "" });
  const [stats, setStats] = useState({
    totalAppointments: 0,
    acceptedAppointments: 0,
    rejectedAppointments: 0,
    diagnosedAppointments: 0,
  });
  const [currentTip, setCurrentTip] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/patient/profile/view`, {
          headers,
        });
        const result = await res.json();
        if (res.ok) setUser(result.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/appointments/history`, {
          headers,
        });
        const data = await res.json();
        if (res.ok) setStats(data.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchUser();
    fetchStats();

    const tipInterval = setInterval(
      () => setCurrentTip((p) => (p + 1) % healthTips.length),
      10000
    );
    const quoteInterval = setInterval(
      () => setQuoteIndex((p) => (p + 1) % motivationalQuotes.length),
      15000
    );
    return () => {
      clearInterval(tipInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="w-full px-6 py-10 bg-gray-50 min-h-[90vh] animate-fadeIn">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.photoUrl || "/default-avatar.png"}
          alt="User Avatar"
          className="object-cover border-2 border-green-400 rounded-full w-14 h-14"
        />
        <div>
          <h1 className="text-2xl font-semibold text-green-700 animate-slideDown">
            Hi, {user?.firstName || "User"} 👋
          </h1>
          <p className="text-gray-600">{motivationalQuotes[quoteIndex]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4 animate-fadeInUp">
        {[
          {
            title: "Total Appointments",
            value: stats.totalAppointments,
            color: "from-green-200 to-green-100",
          },
          {
            title: "Accepted Appointments",
            value: stats.acceptedAppointments,
            color: "from-blue-200 to-blue-100",
          },
          {
            title: "Rejected Appointments",
            value: stats.rejectedAppointments,
            color: "from-red-200 to-red-100",
          },
          {
            title: "Diagnosed",
            value: stats.diagnosedAppointments,
            color: "from-yellow-200 to-orange-100",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color} p-5 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300`}
          >
            <h3 className="font-medium text-gray-700 text-md">{card.title}</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between px-6 py-6 mb-10 border border-green-200 shadow lg:flex-row bg-gradient-to-r from-green-100 to-blue-50 rounded-3xl animate-bounceIn">
        <div className="max-w-xl">
          <h2 className="mb-2 text-2xl font-semibold text-green-800">
            🌿 Stay Healthy, Stay Happy
          </h2>
          <p className="mb-4 text-gray-700 animate-pulse">
            {healthTips[currentTip]}
          </p>
          <p className="text-sm italic text-green-600">
            "The greatest wealth is health." – Virgil
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4359/4359963.png"
          alt="Health banner"
          className="w-40 mt-4 lg:mt-0"
        />
      </div>

      <div className="p-6 text-yellow-900 bg-yellow-100 border border-yellow-300 shadow-inner rounded-2xl animate-fadeInUp">
        <h4 className="mb-1 font-semibold text-md">🔔 Reminder</h4>
        <p className="text-sm">
          It's time for your monthly health checkup. Book it now to stay on top
          of your wellness!
        </p>
      </div>
    </div>
  );
};

export default Home;
