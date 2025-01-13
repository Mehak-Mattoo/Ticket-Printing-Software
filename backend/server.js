const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ limit: "8mb", extended: true }));

const frontendURL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: [frontendURL],
    methods: "GET, POST",
    allowedHeaders: ["Content-Type"],
  })
);

// for file uploads
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

app.get("/", (req, res) => {
  res.send("PDF-Parser Server is running. Welcome!");
});

// Temporary directory for storing files
const tempDirectory = path.join(__dirname, "temp");
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory);
}

// Upload PDF and parse its content
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);

    const extractedData = extractFields(data.text); // this is the extracted pdf content

    // res.status(200).json({ success: true, text: data.text });
    res.status(200).json({ success: true, extractedData });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to parse PDF",
      error: error.message,
    });
  }
});

function extractFields(text) {
  console.log("Raw Text:", text);
  const nameMatch = text.match(/^([A-Za-z\s]+)$/m);
  const name = nameMatch ? nameMatch[1] : "Not found";

  const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "Not found";

  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const email = emailMatch ? emailMatch[0] : "Not found";

  return { name, phone, email };
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
