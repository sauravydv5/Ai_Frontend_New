import React, { useState } from "react";
import symptomList from "../../Components/SymptomList";
import axios from "axios";
import ResultCard from "../../Components/ResultCard";
import { BASE_URL } from "../../utils/constant";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const res = await axios.post(BASE_URL + "/api/symptom/predict-disease", {
      const res = await axios.post(
        "https://ai-medical-recommendation.onrender.com/predict",
        {
          symptoms: selectedSymptoms,
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching prediction", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="mb-4 text-3xl font-bold">🧠 AI Medical Diagnosis</h1>

      <div className="mb-6">
        <p className="mb-2">Select Symptoms:</p>
        <div className="flex flex-wrap gap-2">
          {symptomList.map((symptom) => (
            <button
              key={symptom}
              onClick={() => handleSelect(symptom)}
              className={`px-3 py-1 rounded-full border ${
                selectedSymptoms.includes(symptom)
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <button
        className="px-5 py-2 mb-6 text-white bg-green-600 rounded-lg"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Diagnosis"}
      </button>

      {results && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Results for: {results.disease}
          </h2>
          {results.results.map((item, index) => (
            <ResultCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
