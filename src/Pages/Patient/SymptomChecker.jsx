import React, { useState } from "react";
import axios from "axios";
import Select from "react-select"; // Import React Select
import symptomList from "../../Components/SymptomList";
import { BASE_URL } from "../../utils/constant";

const SymptomChecker = () => {
  // React Select expects options as array of objects with { value, label }
  const options = symptomList.map((symptom) => ({
    value: symptom,
    label: symptom.replace(/_/g, " "),
  }));

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (selectedOptions) => {
    // selectedOptions is array of objects or null if nothing selected
    if (selectedOptions) {
      setSelectedSymptoms(selectedOptions.map((opt) => opt.value));
    } else {
      setSelectedSymptoms([]);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setPredictedDisease("");

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/symptom/check`, {
        symptoms: selectedSymptoms,
      });

      console.log("📦 API Response:", res.data);

      if (res.data?.predictedDisease) {
        setPredictedDisease(res.data.predictedDisease);
      } else {
        setError("⚠️ No prediction received.");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Error checking symptoms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white shadow rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">
        🩺 AI Symptom Checker
      </h2>

      {/* React Select component for dropdown with search */}
      <Select
        options={options}
        isMulti
        onChange={handleChange}
        placeholder="Select symptoms..."
        className="mb-4"
        closeMenuOnSelect={false}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 mt-4 text-white rounded ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Predicting..." : "Predict Disease"}
      </button>

      {predictedDisease && (
        <p className="mt-4 font-semibold text-green-700">
          ✅ Predicted Disease:{" "}
          <span className="font-bold">{predictedDisease}</span>
        </p>
      )}

      {error && <p className="mt-4 font-medium text-red-600">{error}</p>}
    </div>
  );
};

export default SymptomChecker;
