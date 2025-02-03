import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../helper/Alert";
import PrimaryBtn from "../helper/PrimaryBtn";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeSelection, setRouteSelection] = useState("one-way");
  const [ticketType, setTicketType] = useState("D1"); // New state for D1/D2 selection
  const backendUrl = import.meta.env.VITE_AUTH_BACKEND;

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setAlertMessage("No file selected");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRouteChange = (e) => {
    setRouteSelection(e.target.value);
    setTicketType(null); // Reset ticket type when route changes
  };

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setAlertMessage({
        category: "error", 
        title: "Error",
        description: "Please select a file.",
      });
      return;
    }

    if (file.type !== "application/pdf") {
      setAlertMessage({
        category: "error", 
        title: "Error",
        description: "Only PDF files are allowed.",
      });
      return;
    }

    if (!ticketType) {
      setAlertMessage({
        category: "error", 
        title: "Error",
        description: "Please select whether the ticket is D1 or D2.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const getExtractedPdfContent = async () => {
    try {
      const endpoint =
        routeSelection === "one-way"
          ? `${backendUrl}/extract-one-way-pdf-details`
          : `${backendUrl}/extract-two-way-pdf-details`;

      const response = await axios.get(endpoint);

      console.log(response.data);

      if (response.data.success) {
        navigate(`/${routeSelection}`, {
          state: { 
            extractedData: response.data.extractedData,
            ticketType: ticketType // Pass the ticket type to the next page
          },
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
    <div className="bg-gradient-to-r h-screen from-green-100 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white h-fit rounded-2xl shadow-lg p-6 max-w-2xl w-full text-center transform transition-all duration-300 hover:shadow-xl">
        <h2 className="font-sans font-bold text-4xl md:text-4xl lg:text-5xl text-gray-900 mb-2">
          Effortlessly{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Extract Data
          </span>{" "}
          from PDFs
        </h2>

        <p className="text-gray-500 mb-5">
          Upload your PDF and let us handle the rest. Fast, secure, and easy!
        </p>

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

        {routeSelection && (
          <div className="flex items-center justify-center space-x-6 mb-6">
            <p className="text-gray-700 font-medium">Is this ticket D1 or D2?</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="ticketType"
                value="D1"
                checked={ticketType === "D1"}
                onChange={handleTicketTypeChange}
                className="hidden"
              />
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  ticketType === "D1"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                D1
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="ticketType"
                value="D2"
                checked={ticketType === "D2"}
                onChange={handleTicketTypeChange}
                className="hidden"
              />
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  ticketType === "D2"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                D2
              </span>
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
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
              ref={fileInputRef}
            />
          </label>

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