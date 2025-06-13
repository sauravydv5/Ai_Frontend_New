import React, { useEffect, useState } from "react";
import {
  BarChart2,
  UserCheck,
  UserX,
  FileText,
  Users,
  RefreshCcw,
} from "lucide-react";

const DoctorHistory = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadHistoryFromStorage = () => {
    try {
      const accepted =
        JSON.parse(localStorage.getItem("acceptedAppointments")) || [];
      const rejected =
        JSON.parse(localStorage.getItem("rejectedAppointments")) || [];

      const totalAppointments = accepted.length + rejected.length;

      const diagnosedAppointments = accepted.filter(
        (a) => a.diagnosis && a.prescription
      ).length;

      const uniquePatients = new Set(
        accepted.map((a) => a?.patient?._id || a?.patientId)
      ).size;

      const feedbacks =
        JSON.parse(localStorage.getItem("doctorFeedbacks")) || [];

      const profileUpdates =
        parseInt(localStorage.getItem("profileUpdateCount")) || 0;

      setHistory({
        totalAppointments,
        acceptedAppointments: accepted.length,
        rejectedAppointments: rejected.length,
        diagnosedAppointments,
        uniquePatientCount: uniquePatients,
        feedbacks,
        profileUpdates,
      });
    } catch (error) {
      console.error("Error loading local data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoryFromStorage();
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

  const metrics = [
    {
      title: "Total Appointments",
      value: history.totalAppointments,
      icon: <BarChart2 className="w-6 h-6 text-blue-700" />,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Accepted Appointments",
      value: history.acceptedAppointments,
      icon: <UserCheck className="w-6 h-6 text-green-700" />,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Rejected Appointments",
      value: history.rejectedAppointments,
      icon: <UserX className="w-6 h-6 text-red-700" />,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Diagnosed Cases",
      value: history.diagnosedAppointments,
      icon: <FileText className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Unique Patients",
      value: history.uniquePatientCount,
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Profile Updates",
      value: history.profileUpdates,
      icon: <RefreshCcw className="w-6 h-6 text-gray-800" />,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="mb-10 text-4xl font-extrabold text-center text-indigo-800">
        Doctor Activity Overview
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl shadow-lg transition-transform transform hover:scale-105 ${item.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              {item.icon}
            </div>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

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
                    {fb.patient?.firstName || "Unknown"}{" "}
                    {fb.patient?.lastName || ""}
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
