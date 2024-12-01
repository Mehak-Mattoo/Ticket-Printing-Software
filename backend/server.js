const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse"); 
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Configure Multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
     fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs are allowed"), false);
    }
    cb(null, true);
  },
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB limit
  });

// Simple API endpoint to check server status and receive a welcome message
app.get("/", (req, res) => {
  res.send("PDF-Parser Server is running. Welcome!");
});

// Upload PDF and parse its content
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    console.log("File received:", req.file); // Log the file details
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Parse the PDF
    const pdfBuffer = req.file.buffer; // Get the file buffer from memory
    const data = await pdfParse(pdfBuffer); // Parse PDF content

    // Send back parsed text
    res.status(200).json({ success: true, text: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ success: false, message: "Failed to parse PDF", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
