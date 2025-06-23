
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getModuleById } from '../redux/slices/moduleSlice';
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
// import toast from 'react-hot-toast';

// const UserModule = () => {
//   const dispatch = useDispatch();
//   const { moduleList, loading, error } = useSelector((state) => state.module);
//   const loginData = localStorage.getItem('apiKey');
//   const userId = localStorage.getItem('userId');

//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [resultImage, setResultImage] = useState(null);
//   const [detectionData, setDetectionData] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [decodedData, setDecodedData] = useState(null);
//   const [reportUrl, setReportUrl] = useState(null);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [showEmailInput, setShowEmailInput] = useState(false);
//   const [email, setEmail] = useState('');
//   const [imageId, setImageId] = useState(null);

//   useEffect(() => {
//     if (loginData) {
//       dispatch(getModuleById(loginData));
//     }
//   }, [dispatch, loginData]);

//   const isJwt = (str) => typeof str === 'string' && str.split('.').length === 3;

//   const openModal = (mod) => {
//     setSelectedModule(mod);
//     setSelectedImage(null);
//     setResultImage(null);
//     setDetectionData(null);

//     try {
//       const decodedUrl = isJwt(mod.url) ? jwtDecode(mod.url) : { url: mod.url };
//       const decodedReport = isJwt(mod.report_url) ? jwtDecode(mod.report_url) : { url: mod.report_url };
//       setDecodedData(decodedUrl);
//       setReportUrl(decodedReport);
//     } catch (err) {
//       console.error("JWT decode failed:", err);
//       setDecodedData({ url: mod.url });
//       setReportUrl({ url: mod.report_url });
//     }
//   };

//   const closeModal = () => {
//     setSelectedModule(null);
//     setSelectedImage(null);
//     setResultImage(null);
//     setDetectionData(null);
//     setEmail('');
//     setImageId(null);
//     setShowEmailInput(false);
//     setShowReportModal(false)
//   };




//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setSelectedImage(file);
//   };

//   const handleSubmit = async () => {
//     if (!selectedImage || !selectedModule || !decodedData?.url) return;
//     try {
//       setSubmitting(true);
//       const formData = new FormData();
//       formData.append("image", selectedImage);
//       formData.append("customer_id", userId);

//       const response = await axios.post(`http://143.110.242.217:8018${decodedData.url}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setResultImage(`data:image/jpeg;base64,${response.data.image}`);
//       setDetectionData(response.data.data || []);
//       setImageId(response.data.image_id); // Save image ID
//     } catch (error) {
//       console.error("Upload error:", error);
//      toast.success("Image uploaded successfully!");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEmailSubmit = async () => {
//     if (!reportUrl?.url || !email || !imageId) return;

//     try {
//       const formData = new FormData();
//       formData.append("image_id", imageId);
//       formData.append("email", email);

//       const res = await axios.post(`http://143.110.242.217:8018${reportUrl.url}`, formData);
//       toast.success("Email sent successfully!");
//       setShowEmailInput(false);
//       closeModal();
//     } catch (err) {
//       console.error("Email sending error:", err);
//       alert("Failed to send email.");
//     }
//   };



//  const handlePdfSubmit = async () => {
//   if (!reportUrl?.url || !imageId) return;

//   try {
//     const formData = new FormData();
//     formData.append("image_id", imageId);

//     const res = await axios.post(`http://192.168.0.23:8010${reportUrl.url}`, formData, {
//       responseType: 'blob',
//     });

//     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     window.open(pdfUrl, '_blank');
//     closeModal();
//   } catch (err) {
//     console.error("PDF download error:", err);
//     toast.success("PDF downloaded successfully!");
//   }
// };


//   const handleReportOptions = () => {
//     setShowReportModal(true);
//   };

//   const closeReportModal = () => {
//     setShowReportModal(false);
//     setShowEmailInput(false);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">📦 User Modules</h1>

//       {loading && <p className="text-center text-gray-500">Loading modules...</p>}
//       {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
//       {!loading && moduleList.length === 0 && (
//         <p className="text-center text-gray-500">No modules found.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {moduleList.map((mod) => (
//           <div
//             key={mod.id}
//             onClick={() => openModal(mod)}
//             className="bg-white border border-gray-200 hover:shadow-lg p-4 rounded-xl cursor-pointer transition duration-300"
//           >
//             <div className="flex items-center mb-2 space-x-3">
//               <i className={`${mod.icon} text-indigo-600 text-xl`}></i>
//               <h2 className="text-lg font-semibold text-gray-800">{mod.name}</h2>
//             </div>
//             <p className="text-sm text-gray-500">Click to upload image</p>
//           </div>
//         ))}
//       </div>

//       {selectedModule && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
//           <div className="bg-white text-purple-600 p-6 rounded-xl shadow-2xl w-full max-w-4xl relative flex flex-col md:flex-row gap-6">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-purple-600 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             <div className="flex-1 flex flex-col gap-4">
//               <h2 className="text-xl font-bold text-purple-600">
//                 Upload Image for "{selectedModule.name}"
//               </h2>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="bg-black text-white border border-gray-600 rounded-md p-2"
//               />

//               <button
//                 onClick={handleSubmit}
//                 disabled={!selectedImage || submitting}
//                 className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded w-fit ${!selectedImage || submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 SUBMIT
//               </button>

//               <div className="border border-dashed border-black rounded-lg h-64 flex items-center justify-center">
//                 {resultImage ? (
//                   <img
//                     src={resultImage}
//                     alt="Detection Result"
//                     className="max-h-full max-w-full object-contain"
//                   />
//                 ) : (
//                   <span className="text-gray-400">Upload an image to see results</span>
//                 )}
//               </div>
//             </div>

//             <div className="w-full md:w-1/3 bg-black p-4 rounded-lg overflow-auto">
//               <h3 className="text-lg font-bold mb-2 text-white">Detection Results</h3>
//               <div className="text-sm text-gray-300">
//                 {detectionData?.length > 0 ? (
//                   <ul className="space-y-2 text-sm text-gray-200 ">
//                     {detectionData.map((item, index) => (
//                       <li
//                         key={index}
//                         className="border-b border-gray-700 pb-2 rounded-md p-3"
//                         style={{ backgroundColor: item.colour || '#1f2937' }}
//                       >
//                         <p className="text-white font-semibold">
//                           <strong>Confidence:</strong> {item.confidence.toFixed(2)}%
//                         </p>
//                         <p className='text-white font-semibold'>Class: {item.class_name}</p>
//                       </li>
//                     ))}
//                     <button
//                       onClick={handleReportOptions}
//                       className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
//                     >
//                       Show Report
//                     </button>
//                   </ul>
//                 ) : (
//                   <p className="text-gray-400">No detection data available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Report Modal */}
//       {showReportModal && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center relative">
//             <button
//               onClick={closeReportModal}
//               className="absolute top-2 right-3 text-gray-600 text-2xl font-bold hover:text-red-500"
//             >
//               &times;
//             </button>
//             <h2 className="text-xl font-semibold text-purple-700 mb-4">📄 Report Options</h2>

//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={handlePdfSubmit}
//                 className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Download PDF
//               </button>

//               <button
//                 onClick={() => setShowEmailInput(true)}
//                 className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Send via Email
//               </button>
//             </div>

//             {showEmailInput && (
//               <div className="mt-4 flex flex-col gap-2">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border border-gray-400 rounded px-3 py-2 text-black font-semibold"
//                 />
//                 <button
//                   onClick={handleEmailSubmit}
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserModule;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModuleById } from '../redux/slices/moduleSlice';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';

const UserModule = () => {
  const dispatch = useDispatch();
  const { moduleList, loading, error } = useSelector((state) => state.module);
  const loginData = localStorage.getItem('apiKey');
  const userId = localStorage.getItem('userId');

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detectionData, setDetectionData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [decodedData, setDecodedData] = useState(null);
  const [reportUrl, setReportUrl] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [imageId, setImageId] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false); // NEW STATE

  useEffect(() => {
    if (loginData) {
      dispatch(getModuleById(loginData));
    }
  }, [dispatch, loginData]);

  const isJwt = (str) => typeof str === 'string' && str.split('.').length === 3;

  const openModal = (mod) => {
    setSelectedModule(mod);
    setSelectedImage(null);
    setResultImage(null);
    setDetectionData(null);
    setEmail('');
    setImageId(null);
    setShowEmailInput(false);
    setShowReportModal(false);

    try {
      const decodedUrl = isJwt(mod.url) ? jwtDecode(mod.url) : { url: mod.url };
      const decodedReport = isJwt(mod.report_url) ? jwtDecode(mod.report_url) : { url: mod.report_url };
      setDecodedData(decodedUrl);
      setReportUrl(decodedReport);
    } catch (err) {
      console.error("JWT decode failed:", err);
      setDecodedData({ url: mod.url });
      setReportUrl({ url: mod.report_url });
    }
  };

  const closeModal = () => {
    setSelectedModule(null);
    setSelectedImage(null);
    setResultImage(null);
    setDetectionData(null);
    setEmail('');
    setImageId(null);
    setShowEmailInput(false);
    setShowReportModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !selectedModule || !decodedData?.url) return;
    try {
      setSubmitting(true);
      setLoadingResult(true); // Start loading result

      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("customer_id", userId);

      const response = await axios.post(`http://143.110.242.217:8018${decodedData.url}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResultImage(`data:image/jpeg;base64,${response.data.image}`);
      setDetectionData(response.data.data || []);
      setImageId(response.data.image_id);
    } catch (error) {
      console.error("Upload error:", error);
      toast.success("Image uploaded successfully!");
    } finally {
      setLoadingResult(false); // Stop loading
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!reportUrl?.url || !email || !imageId) return;

    try {
      const formData = new FormData();
      formData.append("image_id", imageId);
      formData.append("email", email);

      await axios.post(`http://143.110.242.217:8018${reportUrl.url}`, formData);
      toast.success("Email sent successfully!");
      setShowEmailInput(false);
      closeModal();
    } catch (err) {
      console.error("Email sending error:", err);
      alert("Failed to send email.");
    }
  };

  const handlePdfSubmit = async () => {
    if (!reportUrl?.url || !imageId) return;

    try {
      const formData = new FormData();
      formData.append("image_id", imageId);

      const res = await axios.post(`http://192.168.0.23:8010${reportUrl.url}`, formData, {
        responseType: 'blob',
      });

      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      closeModal();
    } catch (err) {
      console.error("PDF download error:", err);
      toast.success("PDF downloaded successfully!");
    }
  };

  const handleReportOptions = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setShowEmailInput(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">📦 User Modules</h1>

      {loading && <p className="text-center text-gray-500">Loading modules...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
      {!loading && moduleList.length === 0 && (
        <p className="text-center text-gray-500">No modules found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {moduleList.map((mod) => (
          <div
            key={mod.id}
            onClick={() => openModal(mod)}
            className="bg-white border border-gray-200 hover:shadow-lg p-4 rounded-xl cursor-pointer transition duration-300"
          >
            <div className="flex items-center mb-2 space-x-3">
              <i className={`${mod.icon} text-indigo-600 text-xl`}></i>
              <h2 className="text-lg font-semibold text-gray-800">{mod.name}</h2>
            </div>
            <p className="text-sm text-gray-500">Click to upload image</p>
          </div>
        ))}
      </div>

      {selectedModule && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-purple-600 p-6 rounded-xl shadow-2xl w-full max-w-4xl relative flex flex-col md:flex-row gap-6">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-purple-600 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-xl font-bold text-purple-600">
                Upload Image for "{selectedModule.name}"
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-black text-white border border-gray-600 rounded-md p-2"
              />

              <button
                onClick={handleSubmit}
                disabled={!selectedImage || submitting}
                className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded w-fit ${!selectedImage || submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? "Submitting..." : "SUBMIT"}
              </button>

              <div className="border border-dashed border-black rounded-lg h-64 flex items-center justify-center">
                {resultImage ? (
                  <img
                    src={resultImage}
                    alt="Detection Result"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Upload an image to see results</span>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-black p-4 rounded-lg overflow-hidden">
              <h3 className="text-lg font-bold mb-2 text-white">Detection Results</h3>
              <div className="text-sm text-gray-300 max-h-64 overflow-y-auto pr-2">
                {loadingResult ? (
                  <p className="text-white text-center animate-pulse text-2xl">🔄 Processing image...</p>
                ) : detectionData?.length > 0 ? (
                  <ul className="space-y-2 text-sm text-gray-200">
                    {detectionData.map((item, index) => (
                      <li
                        key={index}
                        className="border-b border-gray-700 pb-2 rounded-md p-3"
                        style={{ backgroundColor: item.colour || '#1f2937' }}
                      >
                        <p className="text-white font-semibold">
                          <strong>Confidence:</strong> {item.confidence.toFixed(2)}%
                        </p>
                        <p className="text-white font-semibold">Class: {item.class_name}</p>
                      </li>
                    ))}
                    <button
                      onClick={handleReportOptions}
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Show Report
                    </button>
                  </ul>
                ) : (
                  <p className="text-gray-400">No detection data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center relative">
            <button
              onClick={closeReportModal}
              className="absolute top-2 right-3 text-gray-600 text-2xl font-bold hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-purple-700 mb-4">📄 Report Options</h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={handlePdfSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
              >
                Download PDF
              </button>

              <button
                onClick={() => setShowEmailInput(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
              >
                Send via Email
              </button>
            </div>

            {showEmailInput && (
              <div className="mt-4 flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-2 text-black font-semibold"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModule;

