import React, { useState, useRef } from "react"; // Import useRef
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../helper/Alert"; // Import the custom AlertComponent
import PrimaryBtn from "../helper/PrimaryBtn";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; // Import icons

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeSelection, setRouteSelection] = useState("one-way"); // Added route selection state
  const backendUrl = import.meta.env.VITE_AUTH_BACKEND; // Get backend URL

  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file
    } else {
      setFile(null); // Reset file if none is selected
      setAlertMessage("No file selected"); // Show no file selected message
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  const handleRouteChange = (e) => {
    setRouteSelection(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setAlertMessage({
        category: "error", // Red background for error
        title: "Error",
        description: "Please select a file.",
      });
      return;
    }

    if (file.type !== "application/pdf") {
      setAlertMessage({
        category: "error", // Red background for error
        title: "Error",
        description: "Only PDF files are allowed.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(`${backendUrl}/upload-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setAlertMessage({
          category: "success",
          title: "Success",
          description: "File uploaded successfully!",
        });
        console.log(response.data);
        await getExtractedPdfContent();
      }
    } catch (err) {
      setAlertMessage({
        category: "error",
        title: "Error",
        description: "There was an error uploading the file.",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const getExtractedPdfContent = async () => {
    try {
      const response = await axios.get(`${backendUrl}/extract-pdf-content`);

      console.log(response.data);

      if (response.data.success) {
        navigate(`/${routeSelection}`, {
          state: { extractedData: response.data.extractedData },
        });
      }
    } catch (error) {
      console.error(error);

      setAlertMessage({
        category: "error",
        title: "Error",
        description: "Failed to extract content.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center transform transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
          Effortlessly{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Extract Data
          </span>{" "}
          from PDFs
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 text-lg mb-8">
          Upload your PDF and let us handle the rest. Fast, secure, and easy!
        </p>

        {/* Route Selection */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <p className="text-gray-700 font-medium">Select ticket type:</p>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="route"
              value="one-way"
              checked={routeSelection === "one-way"}
              onChange={handleRouteChange}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                routeSelection === "one-way"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              One Way
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="route"
              value="two-way"
              checked={routeSelection === "two-way"}
              onChange={handleRouteChange}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                routeSelection === "two-way"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Two Way
            </span>
          </label>
        </div>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* File Input Section */}
          <label
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed ${
              file ? "border-blue-500" : "border-gray-300"
            } rounded-2xl cursor-pointer hover:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-gray-100`}
          >
            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
            <span className="text-gray-600">
              {file ? (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-600 transition-all duration-300"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              ) : (
                "Drag & drop or choose a PDF file"
              )}
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach the ref to the file input
            />
          </label>

          {/* Upload Button */}
          <PrimaryBtn
            bgColor="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="ml-2">Uploading...</span>
              </div>
            ) : (
              "Upload"
            )}
          </PrimaryBtn>
        </form>

        {/* Alert Message */}
        {alertMessage && (
          <div className="mt-6 animate-fade-in">
            <Alert
              category={alertMessage.category}
              title={alertMessage.title}
              description={alertMessage.description}
            />
          </div>
        )}
      </div>
    </div>
  );
}