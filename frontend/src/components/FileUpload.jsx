import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../helper/Alert"; // Import the custom AlertComponent
import PrimaryBtn from "../helper/PrimaryBtn";

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeSelection, setRouteSelection] = useState("one-way"); // Added route selection state
  const backendUrl = import.meta.env.VITE_AUTH_BACKEND; // Get backend URL

  const navigate = useNavigate();

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile); // Store the selected file
        // setAlertMessage(selectedFile.name); // Show file name as message
      } else {
        setFile(null); // Reset file if none is selected
        setAlertMessage("No file selected"); // Show no file selected message
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

      console.log(response.data);
      

      if (response.data.success) {
        // Conditionally navigate based on the selected route
        // navigate(`/${routeSelection}`, {
        //   state: { extractedData: response.data.extractedData },
        // });
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
    <div className="bg-midnightGreen h-screen flex flex-col  items-center justify-center">
      <div className=" max-w-lg text-center">
        <h2 className="font-mono font-bold text-2xl md:text-4xl lg:text-6xl  text-aero">
          Effortlessly
          <br />
          <span className="italic bg-aquamarine px-4 mb-7 rounded-full font-extrabold">
            Extract Data
          </span>
          <br />
          from PDFs in Seconds
        </h2>

        {/* Radio buttons for route selection */}
        <div className="flex text-white items-center justify-center space-x-4 m-4">
          <p className="mr-2">Select ticket type: </p>

          {/* One Way Radio Button */}
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="route"
              value="one-way"
              checked={routeSelection === "one-way"}
              onChange={handleRouteChange}
            />
            <span>One Way</span>
          </label>

          {/* Two Way Radio Button */}
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="route"
              value="two-way"
              checked={routeSelection === "two-way"}
              onChange={handleRouteChange}
            />
            <span>Two Way</span>
          </label>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex mt-5 items-center justify-between mx-auto  w-full max-w-sm"
        >
          {/* File Input Section */}
          <label className="border border-aquamarine text-white rounded-full cursor-pointer px-4 py-2 ">
            {/* <span className="">Choose a PDF file</span> */}
            <span className="">
             
              Choose a PDF file {file ? ": "+ file.name :"" }
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Upload Button */}
          <PrimaryBtn bgColor="bg-aquamarine" type="submit">
            Upload
          </PrimaryBtn>
        </form>
      </div>

      {alertMessage && (
        <Alert
        className="mt-5"
          category={alertMessage.category}
          title={alertMessage.title}
          description={alertMessage.description}
        />
      )}
    </div>
  );
}
