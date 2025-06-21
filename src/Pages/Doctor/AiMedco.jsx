import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

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
  };

  return (
    <div className="container max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Prescription Validator</h2>

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
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Validate Prescription
        </button>
      </form>

      {/* Result Section */}
      {result && (
        <div
          className={`mt-6 p-4 border rounded ${
            result.valid_prescription ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <h3 className="mb-2 text-lg font-semibold">Result</h3>
          <p>
            <strong>Disease:</strong> {result.predicted_disease}
          </p>
          <p>
            <strong>Expected Medicines:</strong>{" "}
            {result.expected_medicines.join(", ")}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {result.valid_prescription
              ? "✅ Valid Prescription"
              : "❌ Invalid Prescription"}
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 mt-4 text-red-800 bg-red-100 rounded">{error}</div>
      )}
    </div>
  );
}
