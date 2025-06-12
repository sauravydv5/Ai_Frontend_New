import React, { useEffect, useState } from "react";

const PatientProfileView = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Load patient info from localStorage
    const storedProfile = localStorage.getItem("patientInfo");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  if (!profile) {
    return (
      <div className="mt-10 text-center text-gray-600">
        <p>Loading profile from localStorage...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-teal-600">
        Patient Profile
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Full Name:</strong> {profile.firstName}
        </p>
        <p>
          <strong>Email:</strong> {profile.emailId}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone}
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender}
        </p>
        <p>
          <strong>Address:</strong> {profile.address}
        </p>
        {profile.age && (
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
        )}
        {profile.bloodGroup && (
          <p>
            <strong>Blood Group:</strong> {profile.bloodGroup}
          </p>
        )}
        {profile.medicalHistory && (
          <p>
            <strong>Medical History:</strong> {profile.medicalHistory}
          </p>
        )}
        {profile.allergies && (
          <p>
            <strong>Allergies:</strong> {profile.allergies}
          </p>
        )}
        {profile.emergencyContact && (
          <p>
            <strong>Emergency Contact:</strong> {profile.emergencyContact}
          </p>
        )}
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(profile.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(profile.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PatientProfileView;
