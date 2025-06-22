import React, { useState } from "react";
import axios from "axios";
import { Smile, Frown, Meh, Sun, Moon } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const MoodAnalyzer = () => {
  const [text, setText] = useState("");
  const [moodResult, setMoodResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const analyzeMood = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", { text });
      setMoodResult(res.data);

      const now = new Date();
      const label = now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
      });

      setMoodHistory((prev) => [
        ...prev,
        {
          mood: res.data.mood,
          score: res.data.confidence,
          label,
        },
      ]);
    } catch (err) {
      alert("Failed to analyze mood");
    } finally {
      setLoading(false);
    }
  };

  const renderMoodIcon = (mood) => {
    if (mood === "Positive")
      return <Smile className="w-12 h-12 text-green-500" />;
    if (mood === "Negative")
      return <Frown className="w-12 h-12 text-red-500" />;
    return <Meh className="w-12 h-12 text-yellow-500" />;
  };

  const chartData = {
    labels: moodHistory.map((entry) => entry.label),
    datasets: [
      {
        label: "Mood Confidence",
        data: moodHistory.map((entry) =>
          entry.mood === "Positive"
            ? entry.score * 100
            : entry.mood === "Negative"
            ? -entry.score * 100
            : 0
        ),
        borderColor: "#2563eb",
        backgroundColor: "rgba(147, 197, 253, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: darkMode ? "white" : "black" } },
    },
    scales: {
      y: {
        min: -100,
        max: 100,
        ticks: {
          callback: (val) => `${val}%`,
          color: darkMode ? "white" : "black",
        },
      },
      x: {
        ticks: { color: darkMode ? "white" : "black" },
      },
    },
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } p-6 md:p-8 rounded-3xl shadow-xl max-w-3xl mx-auto mt-10`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">🧠 Mood Analyzer</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 transition bg-gray-200 rounded-full shadow-sm dark:bg-gray-700 hover:scale-105"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-blue-900" />
          )}
        </button>
      </div>

      {/* Input */}
      <textarea
        rows={4}
        className="w-full p-4 text-sm text-black border border-gray-300 md:text-base dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Analyze Button */}
      <button
        onClick={analyzeMood}
        disabled={loading}
        className="w-full py-2 mt-4 text-base font-semibold text-white transition duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze Mood"}
      </button>

      {/* Result Card */}
      {moodResult && (
        <div className="p-5 mt-6 text-center bg-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl">
          <div className="flex justify-center mb-2">
            {renderMoodIcon(moodResult.mood)}
          </div>
          <h3 className="text-xl font-semibold">Mood: {moodResult.mood}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Confidence: {(moodResult.confidence * 100).toFixed(2)}%
          </p>
          <div className="w-full h-3 mt-3 bg-gray-300 rounded-full dark:bg-gray-600">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                moodResult.mood === "Positive"
                  ? "bg-green-500"
                  : moodResult.mood === "Negative"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
              style={{ width: `${moodResult.confidence * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Mood Chart */}
      {moodHistory.length > 0 && (
        <div className="mt-10">
          <h4 className="mb-4 text-lg font-medium">📈 Weekly Mood Trend</h4>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default MoodAnalyzer;
