// import React, { useState } from "react";
// import axios from "axios";
// import { Loader2, UploadCloud } from "lucide-react";

// const diseaseInfo = {
//   nv: {
//     name: "Melanocytic Nevus (Common Mole)",
//     type: "Benign",
//     description:
//       "A non-cancerous pigmented skin lesion composed of melanocytes.",
//     advice: "Usually harmless. Monitor for changes in shape, size, or color.",
//   },
//   mel: {
//     name: "Melanoma",
//     type: "Malignant",
//     description:
//       "A serious form of skin cancer that arises from pigment cells (melanocytes).",
//     advice:
//       "Seek immediate dermatological evaluation. Early detection is critical.",
//   },
//   bkl: {
//     name: "Benign Keratosis-like Lesion",
//     type: "Benign",
//     description:
//       "Includes seborrheic keratoses and other non-dangerous skin growths.",
//     advice: "Usually harmless, but monitor for changes or irritation.",
//   },
//   bcc: {
//     name: "Basal Cell Carcinoma",
//     type: "Malignant",
//     description:
//       "A common type of skin cancer that grows slowly and rarely spreads.",
//     advice: "Requires medical removal. Consult a dermatologist.",
//   },
//   akiec: {
//     name: "Actinic Keratoses / Intraepithelial Carcinoma",
//     type: "Precancerous",
//     description:
//       "Scaly patches caused by sun damage that may evolve into squamous cell carcinoma.",
//     advice: "Early treatment recommended. Consult your dermatologist.",
//   },
//   vasc: {
//     name: "Vascular Lesion",
//     type: "Benign",
//     description:
//       "Lesions involving blood vessels like angiomas or hemorrhages.",
//     advice: "Usually harmless, seek medical advice if painful or growing.",
//   },
//   df: {
//     name: "Dermatofibroma",
//     type: "Benign",
//     description: "A small, firm skin nodule that is typically non-cancerous.",
//     advice: "No treatment required unless symptomatic or for cosmetic reasons.",
//   },
// };

// const SkinDiagnosisApp = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setResult(null);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!image) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/diagnose-image",
//         formData
//       );
//       setResult(res.data);
//     } catch (err) {
//       alert("Diagnosis failed. Please try again.");
//     }
//     setLoading(false);
//   };

//   const handleClear = () => {
//     setImage(null);
//     setPreview(null);
//     setResult(null);
//   };

//   const disease = diseaseInfo[result?.disease];

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-sky-100 to-blue-200">
//       <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-6 text-center transition-transform duration-300 hover:scale-[1.02]">
//         <h1 className="mb-6 text-3xl font-extrabold text-blue-700 drop-shadow-sm">
//           🩺 Skin Disease Classifier
//         </h1>

//         <input
//           type="file"
//           accept="image/*"
//           id="fileInput"
//           onChange={handleImageChange}
//           className="hidden"
//         />
//         <label
//           htmlFor="fileInput"
//           className="p-6 transition bg-white border-2 border-blue-400 border-dashed cursor-pointer rounded-xl hover:bg-blue-50"
//         >
//           <div className="flex flex-col items-center">
//             <UploadCloud size={34} className="text-blue-500" />
//             <p className="mt-2 font-medium text-blue-500">
//               Click or drag to upload image
//             </p>
//           </div>
//         </label>

//         {preview && (
//           <div className="mt-5">
//             <img
//               src={preview}
//               alt="Uploaded"
//               className="object-cover w-full shadow-md rounded-xl"
//             />
//           </div>
//         )}

//         <div className="flex justify-center gap-3 mt-6">
//           <button
//             onClick={handleSubmit}
//             disabled={!image || loading}
//             className="px-4 py-2 font-semibold text-white bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-50"
//           >
//             {loading ? (
//               <Loader2 className="mx-auto animate-spin" />
//             ) : (
//               "Diagnose"
//             )}
//           </button>
//           <button
//             onClick={handleClear}
//             className="px-4 py-2 font-semibold text-gray-800 bg-gray-100 shadow rounded-xl hover:bg-gray-200"
//           >
//             Clear
//           </button>
//         </div>

//         {result && disease && (
//           <div className="p-5 mt-6 text-left shadow-inner bg-blue-50 rounded-xl">
//             <h2 className="mb-2 text-lg font-bold text-blue-800">
//               🔍 Diagnosis Result
//             </h2>
//             <p className="mb-1 text-blue-700">
//               <strong>Disease:</strong> {disease.name}
//             </p>
//             <p className="mb-1 text-blue-700">
//               <strong>Type:</strong> {disease.type}
//             </p>
//             <p className="mb-1 text-blue-700">
//               <strong>Confidence:</strong>{" "}
//               {(result.confidence * 100).toFixed(2)}%
//             </p>
//             <p className="mb-1 text-blue-700">
//               <strong>Description:</strong> {disease.description}
//             </p>
//             <p className="text-blue-700">
//               <strong>Advice:</strong> {disease.advice}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkinDiagnosisApp;
