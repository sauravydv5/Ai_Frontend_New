import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const symptomOptions = [
  "fever",
  "chills",
  "body ache",
  "dry cough",
  "loss of taste",
  "joint pain",
  "burning urination",
  "headache",
  "fatigue",
  "thirst",
].map((s) => ({ value: s, label: s }));

export default function AiMedco() {
  const [symptoms, setSymptoms] = useState([]);
  const [medicines, setMedicines] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await axios.post(
        "https://medicine-recomndation.onrender.com/predict",
        {
          symptoms: symptoms.map((s) => s.value),
          medicines: medicines.split(",").map((m) => m.trim()),
        }
      );
      setResult(res.data);
    } catch (err) {
      setError("Validation failed. Check your inputs or server.");
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold text-blue-700">
        Prescription Validator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Symptoms</label>
          <Select
            isMulti
            options={symptomOptions}
            onChange={setSymptoms}
            className="mb-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prescribed Medicines</label>
          <input
            type="text"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="e.g. Paracetamol, Oseltamivir"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Validating..." : "Validate Prescription"}
        </button>
      </form>

      {loading && (
        <div className="flex items-center mt-4 space-x-2 text-gray-600 animate-pulse">
          <svg
            className="w-5 h-5 text-blue-600 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Fetching validation results...</span>
        </div>
      )}

      {result && (
        <>
          <div
            className={`mt-6 p-5 rounded-xl border-2 ${
              result.valid_prescription
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold">
                Diagnosis:{" "}
                <span className="text-blue-800">
                  {result.predicted_disease}
                </span>
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  result.valid_prescription
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {result.valid_prescription ? "✅ Valid" : "❌ Invalid"}
              </span>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">Expected Medicines:</strong>
              <ul className="flex flex-wrap gap-2 mt-1">
                {result.expected_medicines.map((med, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full"
                  >
                    💊 {med}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 mb-2">
              <strong className="text-gray-800">Prescribed Medicines:</strong>
              <ul className="flex flex-wrap gap-2 mt-1">
                {result.prescribed_medicines.map((med, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full"
                  >
                    📝 {med}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <strong className="text-gray-800">Match Score:</strong>{" "}
              <span className="font-semibold text-indigo-700">
                {Math.round(
                  (result.expected_medicines.filter((med) =>
                    result.prescribed_medicines.includes(med)
                  ).length /
                    result.expected_medicines.length) *
                    100
                ) || 0}
                %
              </span>
            </div>
          </div>

          <div className="p-4 mt-4 text-sm text-yellow-800 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
            ⚠️ <strong>Disclaimer:</strong> This AI-based prediction is for
            reference only. Always consult a certified medical professional for
            actual prescriptions.
          </div>
        </>
      )}

      {Array.isArray(result?.expected_medicines) &&
        result.expected_medicines.length > 0 && (
          <button
            onClick={() =>
              navigate("/doctor-dashboard/add-diagnosis", {
                state: {
                  prescription: result.expected_medicines.join(", "),
                  diagnosis: result.predicted_disease,
                },
              })
            }
            className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Use This Prescription
          </button>
        )}

      {error && (
        <div className="p-3 mt-4 text-red-800 bg-red-100 rounded">{error}</div>
      )}
    </div>
  );
}
