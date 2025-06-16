// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constant";

// const PatientLogin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { identifier, password } = formData;
//     if (!identifier || !password) {
//       setError("Please fill in both fields");
//       return;
//     }

//     try {
//       const res = await axios.post(BASE_URL + "/patient/login", formData, {
//         withCredentials: true,
//       });

//       if (res.data.token && res.data.user) {
//         // // ✅ Save token
//         // localStorage.setItem("token", res.data.token);

//         // ✅ Save complete patient info
//         localStorage.setItem("patientInfo", JSON.stringify(res.data.user));

//         alert("Login successful!");
//         navigate("/Patient-dashboard");
//       } else {
//         setError(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-green-100 to-teal-200">
//       <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:p-8">
//         <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
//           Patient Login
//         </h2>

//         {error && (
//           <p className="mb-4 text-sm text-center text-red-600">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Email or Username</label>
//             <input
//               type="text"
//               name="identifier"
//               value={formData.identifier}
//               onChange={handleChange}
//               required
//               placeholder="Enter email or username"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-teal-600 rounded-md hover:bg-teal-700"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/patientregister" className="text-teal-500 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PatientLogin;

// NEW CODE

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    if (!identifier || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/patient/login`, formData);

      if (res.data.token && res.data.user) {
        // Store token in localStorage
        localStorage.setItem("token", res.data.token);
        // Store patient user data
        localStorage.setItem("patientInfo", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/Patient-dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-green-100 to-teal-200">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
          Patient Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email or Username</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              placeholder="Enter email or username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-teal-600 rounded-md hover:bg-teal-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/patientregister" className="text-teal-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
