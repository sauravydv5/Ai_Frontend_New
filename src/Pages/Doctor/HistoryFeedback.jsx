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
      const res = await axios.get(`${BASE_URL}/appointments/history`, {
        withCredentials: true,
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

  // Calculate additional metrics
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

      {/* Metrics Cards */}
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

      {/* Optional Future Graph Placeholder */}
      {/* <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Monthly Diagnosis Trend</h2>
        <ChartComponent data={...} />
      </div> */}

      {/* Feedback Section */}
      <div className="p-6 mt-12 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Patient Feedback
        </h2>
        {history.feedbacks && history.feedbacks.length > 0 ? (
          <div className="space-y-4">
            {history.feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="p-4 transition border bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-indigo-700">
                    {fb.patient?.name || "Unknown"}
                  </span>
                  <span className="text-sm font-bold text-yellow-600">
                    ⭐ {fb.rating}/5
                  </span>
                </div>
                {fb.comment && (
                  <p className="mt-2 text-sm text-gray-700">{fb.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No feedback received yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorHistory;
