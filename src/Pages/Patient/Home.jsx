import React, { useEffect, useState } from "react";

const healthTips = [
  "Drink at least 8 glasses of water daily 💧",
  "Take a 5-minute walk every hour 🚶‍♂️",
  "Eat more fruits and greens 🍎🥦",
  "Don't skip breakfast! 🍳",
  "Sleep 7-9 hours to refresh your mind 💤",
];

const motivationalQuotes = [
  "“Take care of your body. It's the only place you have to live.” – Jim Rohn",
  "“To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear.” – Buddha",
  "“Health is a state of complete harmony of the body, mind, and spirit.” – B.K.S. Iyengar",
];

const Home = () => {
  const user = JSON.parse(localStorage.getItem("patientInfo")) || {
    name: "User",
  };
  const [appointment, setAppointment] = useState(null);
  const [currentTip, setCurrentTip] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patientAppointment"));
    if (stored) {
      setAppointment(stored);
    }

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 10000);

    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 15000);

    return () => {
      clearInterval(tipInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="w-full px-6 py-10 bg-gray-50 min-h-[90vh] animate-fadeIn">
      <h1 className="mb-1 text-2xl font-semibold text-green-700 animate-slideDown">
        Hi, {user?.firstName ? user.firstName : user?.name || "User"} 👋
      </h1>
      <p className="mb-6 text-gray-600">{motivationalQuotes[quoteIndex]}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4 animate-fadeInUp">
        {[
          {
            title: "Appointments",
            value: "03",
            color: "from-green-200 to-green-100",
          },
          { title: "Doctors", value: "12", color: "from-sky-200 to-blue-100" },
          {
            title: "Prescriptions",
            value: "05",
            color: "from-pink-200 to-rose-100",
          },
          {
            title: "Health Score",
            value: "88%",
            color: "from-yellow-100 to-orange-100",
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

      {/* Banner */}
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

      {/* Upcoming Appointment Card */}
      {appointment ? (
        <div className="p-6 mb-8 bg-white border shadow-md rounded-2xl animate-fadeInUp">
          <h3 className="mb-3 text-lg font-semibold text-green-700">
            📅 Your Upcoming Appointment
          </h3>
          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
            <div>
              <p className="font-medium text-gray-800">
                {appointment.doctorName} ({appointment.specialization})
              </p>
              <p className="text-sm text-gray-500">
                {appointment.date} at {appointment.time}
              </p>
            </div>
            <button className="px-4 py-2 mt-3 text-white transition bg-green-600 shadow sm:mt-0 rounded-xl hover:bg-green-700">
              View Details
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 mb-8 bg-white border shadow-md rounded-2xl animate-fadeInUp">
          <h3 className="mb-3 text-lg font-semibold text-green-700">
            📅 No Upcoming Appointments
          </h3>
          <p className="text-sm text-gray-500">
            You haven't booked any appointments yet.
          </p>
        </div>
      )}

      {/* Health Reminder */}
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
