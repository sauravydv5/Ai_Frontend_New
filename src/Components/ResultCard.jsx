import React from "react";

const ResultCard = ({ data }) => {
  return (
    <div className="p-4 mb-4 bg-white border shadow-md rounded-xl">
      <h2 className="text-xl font-bold text-blue-600">
        {data.predicted_disease} ({data.age_group})
      </h2>
      <p>
        <strong>Reason:</strong> {data.reason}
      </p>
      <p>
        <strong>Medicine:</strong> {data.medicine}
      </p>
      <p>
        <strong>Doctor:</strong> {data.doctor_speciality}
      </p>
      <p>
        <strong>Advice:</strong> {data.lifestyle_advice}
      </p>
      <p>
        <strong>Tests:</strong> {data.recommended_tests}
      </p>
      <p>
        <strong>Severity:</strong> {data.severity}
      </p>
    </div>
  );
};

export default ResultCard;
