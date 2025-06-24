import React, { useEffect, useState } from "react";
import {
  BarChart2,
  UserCheck,
  UserX,
  FileText,
  Users,
  RefreshCcw,
  Star,
  Percent,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const DoctorHistory = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/appointments/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(res.data.data);
    } catch (error) {
      console.error("Failed to fetch doctor history:", error);
      setHistory(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Fetching your activity...
      </div>
    );
  }

  if (!history) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Failed to load history.
      </div>
    );
  }

  // 📊 Metrics Calculations
  const completionRate =
    history.totalAppointments > 0
      ? (
          (history.diagnosedAppointments / history.totalAppointments) *
          100
        ).toFixed(1)
      : 0;

  const averageRating =
    history.feedbacks && history.feedbacks.length > 0
      ? (
          history.feedbacks.reduce((acc, fb) => acc + fb.rating, 0) /
          history.feedbacks.length
        ).toFixed(1)
      : "N/A";

  const metrics = [
    {
      title: "Total Appointments",
      value: history.totalAppointments || 0,
      icon: <BarChart2 className="w-6 h-6 text-blue-700" />,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Accepted Appointments",
      value: history.acceptedAppointments || 0,
      icon: <UserCheck className="w-6 h-6 text-green-700" />,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Rejected Appointments",
      value: history.rejectedAppointments || 0,
      icon: <UserX className="w-6 h-6 text-red-700" />,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Diagnosed Cases",
      value: history.diagnosedAppointments || 0,
      icon: <FileText className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Unique Patients",
      value: history.uniquePatientCount || 0,
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Profile Updates",
      value: history.profileUpdates || 0,
      icon: <RefreshCcw className="w-6 h-6 text-gray-800" />,
      color: "bg-gray-100 text-gray-800",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: <Percent className="w-6 h-6 text-teal-700" />,
      color: "bg-teal-50 text-teal-700",
    },
    {
      title: "Avg. Rating",
      value: averageRating === "N/A" ? "No Ratings" : `${averageRating} ★`,
      icon: <Star className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="mb-10 text-4xl font-extrabold text-center text-indigo-800">
        Doctor Activity Overview
      </h1>

      {/* 📈 Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl shadow-md transition-transform transform hover:scale-105 ${item.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">{item.title}</h2>
              {item.icon}
            </div>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 🏆 Performance Highlights Section (New) */}
      <div className="p-6 mt-12 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-100 rounded-2xl">
        <h2 className="mb-6 text-3xl font-extrabold text-center text-purple-800">
          Doctor's Performance Highlights
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 🎖️ Badge 1 */}
          <div className="relative p-5 transition duration-300 ease-in-out transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105">
            <div className="absolute px-3 py-1 text-sm font-bold text-white bg-yellow-400 rounded-full shadow -top-4 -left-4">
              ⭐ Elite Care
            </div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-800">
              High Completion Rate
            </h3>
            <p className="text-sm text-gray-600">
              {completionRate}% of appointments completed with diagnosis.
              Reflects commitment & excellence.
            </p>
          </div>

          {/* 🎯 Badge 2 */}
          <div className="relative p-5 transition duration-300 ease-in-out transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105">
            <div className="absolute px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full shadow -top-4 -left-4">
              🏅 Consistent
            </div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-800">
              Profile Engagement
            </h3>
            <p className="text-sm text-gray-600">
              {history.profileUpdates || 0} profile updates show active presence
              and up-to-date availability.
            </p>
          </div>

          {/* ❤️ Badge 3 */}
          <div className="relative p-5 transition duration-300 ease-in-out transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105">
            <div className="absolute px-3 py-1 text-sm font-bold text-white bg-pink-500 rounded-full shadow -top-4 -left-4">
              💬 Impact
            </div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-800">
              Unique Patients Served
            </h3>
            <p className="text-sm text-gray-600">
              {history.uniquePatientCount || 0} unique patients received care. A
              mark of growing trust.
            </p>
          </div>

          {/* 💡 Motivational Quote */}
          <div className="relative p-5 text-white transition-all duration-300 ease-in-out bg-indigo-800 shadow-lg rounded-xl hover:rotate-1 hover:scale-105">
            <div className="absolute px-3 py-1 text-sm font-bold text-indigo-800 bg-white rounded-full shadow -top-4 -left-4">
              ✨ Inspire
            </div>
            <blockquote className="mb-2 text-lg italic">
              “Wherever the art of medicine is loved, there is also a love of
              humanity.”
            </blockquote>
            <p className="text-sm text-right">– Hippocrates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHistory;
