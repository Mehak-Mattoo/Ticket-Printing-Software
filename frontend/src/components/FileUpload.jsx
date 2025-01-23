import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../helper/Alert"; // Import the custom AlertComponent

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeSelection, setRouteSelection] = useState("one-way"); // Added route selection state
  const backendUrl = import.meta.env.VITE_AUTH_BACKEND; // Get backend URL

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        getExtractedPdfContent();
      }
    } catch (err) {
      setAlertMessage({
        category: "error",
        title: "Error",
        description: "There was an error uploading the file.",
      });
    }
  };

  const getExtractedPdfContent = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${backendUrl}/extract-pdf-content`);

      if (response.data.success) {
        // Conditionally navigate based on the selected route
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-skyBlue h-screen flex flex-col  items-center justify-center">
      <h2 className="font-bold text-4xl">
        Effortlessly <span className="font-extrabold"> Extract Data</span> from
        PDFs in Seconds
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Radio buttons for route selection */}
      <div>
        <label>
          <input
            type="radio"
            name="route"
            value="one-way"
            checked={routeSelection === "one-way"}
            onChange={handleRouteChange}
          />
          One Way
        </label>
        <label>
          <input
            type="radio"
            name="route"
            value="two-way"
            checked={routeSelection === "two-way"}
            onChange={handleRouteChange}
          />
          Two Way
        </label>
      </div>

      {alertMessage && (
        <Alert
          category={alertMessage.category}
          title={alertMessage.title}
          description={alertMessage.description}
        />
      )}
    </div>
  );
}
