const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const bodyParser = require("body-parser");
 const translatte = require('translatte');
const  speakingUrl  = require('speakingurl'); 
const translate = require("google-translate-api-x");
const { Document, Packer, Paragraph, TextRun } = require("docx");
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

    //const extractedData = extractFields(data.text); // this is the extracted pdf content

    res.status(200).json({ success: true, text: data.text });
    // res.status(200).json({ success: true, extractedData });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to parse PDF",
      error: error.message,
    });
  }
});

app.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({
      success: false,
      message:
        'Please provide both "text" and "targetLanguage" in the request body',
    });
  }

  try {
    const translation = await translate(text, {
      to: targetLanguage,
      autoCorrect: true,
    });

  //   // Create a new Document
  //   const doc = new Document({
  //     sections: [
  //       {
  //         properties: {},
  //         children: [
  //           new Paragraph({
  //             children: [
  //               new TextRun("Translated Text:\n"),
  //               new TextRun({
  //                 text: translation.text,
  //                 bold: true,
  //               }),
  //             ],
  //           }),
  //         ],
  //       },
  //     ],
  //   });

  //  const filePath = path.join(tempDirectory, "translated-text.docx");

  //  // Use Packer to create the .docx file and save it to disk
  //  await Packer.toBuffer(doc).then((buffer) => {
  //    fs.writeFileSync(filePath, buffer);
  //  });

 

    res
      .status(200)
      .json({
        success: true,
        text: translation.text,
    //    downloadLink: `${frontendURL}/download/translated-text.docx`,
      }); 
  } catch (error) {
    console.error("Error translating text:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Translation failed",
        error: error.message,
      });
  }
});


app.get("/transliterate", (req, res) => {
  const { text } = req.query; 

  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the "text" parameter',
    });
  }

  try {
  
    const transliteratedText = speakingUrl(text);

    res.status(200).json({
      success: true,
      transliteration: transliteratedText,
    });
  } catch (error) {
    console.error("Error transliterating text:", error);
    res.status(500).json({
      success: false,
      message: "Transliteration failed",
      error: error.message,
    });
  }
});



// Endpoint to handle file download
app.post("/generate-doc", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ success: false, message: "Text is required" });
  }

  try {
    // Create a new Word document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph({ children: [new TextRun(text)] })],
        },
      ],
    });

    // Generate the document as a buffer
    const buffer = await Packer.toBuffer(doc);

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=translated-text.docx",
    });

    res.send(buffer);
  } catch (error) {
    console.error("Error generating document:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate document" });
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
