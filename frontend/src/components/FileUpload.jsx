import React, { useState } from "react";
import axios from "axios";

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);


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
      // Make sure the URL is correctly being formed
      const backendUrl =  import.meta.env.VITE_AUTH_BACKEND; // Get backend URL
      const response = await axios.post(
        `${backendUrl}/upload-pdf`, // Ensure backend endpoint is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      if (response.data.success) {
        setError(false);
        console.log(response.data);
        setResult(response.data.data); 
        
        setMessage("File uploaded successfully!");
      }
    } catch (err) {
      setError(true);
      setMessage("There was an error scheduling the email.");
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
          <h2>Extracted Data</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Phone Number:</strong> {result.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}
