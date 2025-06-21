import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import ResultCard from "../../Components/ResultCard";
import { BASE_URL } from "../../utils/constant";
import symptomList from "../../Components/SymptomList"; // same list as you shared

const symptomOptions = symptomList.map((s) => ({ label: s, value: s }));

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-medical-recommendation.onrender.com/predict",
        {
          symptoms: selectedSymptoms.map((s) => s.value),
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
      <h1 className="mb-6 text-3xl font-bold text-blue-700">
        🧠 AI Medical Diagnosis
      </h1>

      <div className="mb-6">
        <p className="mb-2 font-medium">Search and Select Symptoms:</p>
        <Select
          isMulti
          options={symptomOptions}
          value={selectedSymptoms}
          onChange={setSelectedSymptoms}
          className="text-sm"
          placeholder="Type to search symptoms..."
        />
      </div>

      <button
        className="px-5 py-2 mb-6 text-white bg-green-600 rounded-lg hover:bg-green-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Diagnosis"}
      </button>

      {results && (
        <div>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
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
