import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/patient/profile", {
        // Include credentials if your API uses cookies for authentication
        withCredentials: true,
        headers: {
          // If using token in header, send like this:
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // On success, set profile data
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // On error, set error message
        setError("Error loading profile data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Patient Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Render other profile details */}
    </div>
  );
};

export default ProfileView;
