// import React, { useState } from "react";
// import axios from "axios";
// import Select from "react-select"; // Import React Select
// import symptomList from "../../Components/SymptomList";
// import { BASE_URL } from "../../utils/constant";

// const SymptomChecker = () => {
//   // React Select expects options as array of objects with { value, label }
//   const options = symptomList.map((symptom) => ({
//     value: symptom,
//     label: symptom.replace(/_/g, " "),
//   }));

//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [predictedDisease, setPredictedDisease] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (selectedOptions) => {
//     // selectedOptions is array of objects or null if nothing selected
//     if (selectedOptions) {
//       setSelectedSymptoms(selectedOptions.map((opt) => opt.value));
//     } else {
//       setSelectedSymptoms([]);
//     }
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setPredictedDisease("");

//     if (selectedSymptoms.length === 0) {
//       setError("Please select at least one symptom.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${BASE_URL}/api/symptom/check`, {
//         symptoms: selectedSymptoms,
//       });

//       console.log("📦 API Response:", res.data);

//       if (res.data?.predictedDisease) {
//         setPredictedDisease(res.data.predictedDisease);
//       } else {
//         setError("⚠️ No prediction received.");
//       }
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       setError("Error checking symptoms. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl p-6 mx-auto bg-white shadow rounded-xl">
//       <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">
//         🩺 AI Symptom Checker
//       </h2>

//       {/* React Select component for dropdown with search */}
//       <Select
//         options={options}
//         isMulti
//         onChange={handleChange}
//         placeholder="Select symptoms..."
//         className="mb-4"
//         closeMenuOnSelect={false}
//       />

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className={`px-4 py-2 mt-4 text-white rounded ${
//           loading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Predicting..." : "Predict Disease"}
//       </button>

//       {predictedDisease && (
//         <p className="mt-4 font-semibold text-green-700">
//           ✅ Predicted Disease:{" "}
//           <span className="font-bold">{predictedDisease}</span>
//         </p>
//       )}

//       {error && <p className="mt-4 font-medium text-red-600">{error}</p>}
//     </div>
//   );
// };

// export default SymptomChecker;

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
      const res = await axios.post(BASE_URL + "/api/symptom/predict-disease", {
        symptoms: selectedSymptoms,
      });
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
