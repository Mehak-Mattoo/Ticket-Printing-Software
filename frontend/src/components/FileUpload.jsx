import React, { useState } from "react";
import axios from "axios";

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [extractError, setExtractError] = useState(null);
  const backendUrl = import.meta.env.VITE_AUTH_BACKEND; // Get backend URL

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError(true);
      setMessage("Please select a file.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError(true);
      setMessage("Only PDF files are allowed.");
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

      // Handle success response
      if (response.data.success) {
        setError(false);
        setResult(response.data.extractedData);
        console.log(response.data.extractedData);

        setMessage("File uploaded successfully!");
        console.log(response.data);
      }
    } catch (err) {
      setError(true);
      setMessage("There was an error uploading the file.");
    }
  };

  const getExtractedPdfContent = async () => {
    setIsLoading(true);
    setExtractError(null);

    try {
      const response = await axios.get(`${backendUrl}/extract-pdf-content`);

      if (response.data.success) {
        setExtractedData(response.data.extractedData);
      } else {
        setExtractError("Failed to extract content");
      }
    } catch (error) {
      setExtractError("Error extracting content");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {message && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            color: error ? "red" : "green",
            border: `1px solid ${error ? "red" : "green"}`,
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      {result && (
        <div>
          <h2>Parsed Data</h2>
          {/* If result is an object, stringify it or access specific properties */}
          {/* <p>{JSON.stringify(result)}</p> Converts object to a readable string */}

          {/* Alternatively, if you want to display specific fields */}
          {result.success && (
            <p>
              <strong>Success:</strong> {result.success ? "Yes" : "No"}
            </p>
          )}
        
        </div>
      )}

      {file && !isLoading && (
        <div>
          <button onClick={getExtractedPdfContent} disabled={isLoading}>
            {isLoading ? "Extracting..." : "Extract PDF Content"}
          </button>
        </div>
      )}

      {extractedData && (
        <div>
          <h2>Extracted Content</h2>
          <pre>{JSON.stringify(extractedData, null, 2)}</pre>
        </div>
      )}

      {extractError && <p style={{ color: "red" }}>{extractError}</p>}
    </div>
  );
}
