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

let uploadedFile = null;
// Upload PDF and parse its content
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    uploadedFile = req.file.buffer;

    res
      .status(200)
      .json({ success: true, message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
      error: error.message,
    });
  }
});

app.get("/extract-pdf-content", async (req, res) => {
  try {
    if (!uploadedFile) {
      return res
        .status(400)
        .json({ success: false, message: "No PDF uploaded" });
    }

    const data = await pdfParse(uploadedFile);

    const extractedData = OneWayExtractFields(data.text);

    res.status(200).json({ success: true, extractedData });
  } catch (error) {
    console.error("Error extracting PDF content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to extract PDF content",
      error: error.message,
    });
  }
});

function OneWayExtractFields(text) {
  const nameMatch = text.match(
    /(?:Passenger’s Name|Traveller)\s+([A-Z][A-Z\s]*)\n/
  );
  const name = nameMatch ? nameMatch[1].trim() : "Not found";

  // Passport Number
  const passportMatch = text.match(/Passport Number\s+([A-Z0-9]+)/);
  const passportNumber = passportMatch ? passportMatch[1] : "Not found";

  const dobMatch = text.match(
    /\b(?:DOB|Date of Birth):?\s*(\d{2}[-/]\d{2}[-/]\d{4})\b/
  );
  const dob = dobMatch ? dobMatch[1].trim() : "Not found";

  // Airline Name
  const airlineMatch = text.match(/Airline:\s+(.+)/);
  const airlineName = airlineMatch ? airlineMatch[1].trim() : "Not found";

  // Flight Number
  const flightNumberMatch = text.match(/Flight (?:Number|No):\s+(\w+\d+)/);
  const flightNumber = flightNumberMatch ? flightNumberMatch[1] : "Not found";

  // Cabin
  const cabinMatch = text.match(/Cabin Class:\s+([A-Za-z]+)/);
  const cabin = cabinMatch ? cabinMatch[1] : "Not found";

  // Stops
  const stopsMatch = text.match(/Stop:.*?(\d+H \d+M)/);
  const stops = stopsMatch ? stopsMatch[1] : "0";

  // Airline PNR
  const pnrMatch = text.match(/Airline reservation code \(PNR\):\s+(\w+)/);
  const pnr = pnrMatch ? pnrMatch[1] : "Not found";

  // E-ticket Number
  const ticketMatch = text.match(/Ticket Number:\s+(\d+)/);
  const eTicket = ticketMatch ? ticketMatch[1] : "Not found";

  // Extract Origin Airport Name
  const originAirportMatch = text.match(/Origin\s+([\w\s()]+)\n/);
  const originAirport = originAirportMatch
    ? originAirportMatch[1].trim()
    : "Not found";

  // Extract Origin City and Country
  const originCityCountryMatch = text.match(/Origin\s+[\w\s()]+\n(.+)\n/);
  const originCityCountry = originCityCountryMatch
    ? originCityCountryMatch[1].trim()
    : "Not found";

  // Extract Destination Airport Name
  const destinationAirportMatch = text.match(/Destination\s+([\w\s()]+)\n/);
  const destinationAirport = destinationAirportMatch
    ? destinationAirportMatch[1].trim()
    : "Not found";

  // Extract Destination City and Country
  const destinationCityCountryMatch = text.match(
    /Destination\s+[\w\s()]+\n(.+)\n/
  );
  const destinationCityCountry = destinationCityCountryMatch
    ? destinationCityCountryMatch[1].trim()
    : "Not found";

  // Date
  const dateMatch = text.match(/\b\d{2} [A-Za-z]+ \d{4}\b/);
  const date = dateMatch ? dateMatch[0] : "Not found";

  // Time
  const timeMatch = text.match(/\b\d{2}:\d{2}\b/);
  const time = timeMatch ? timeMatch[0] : "Not found";

  // Baggage
  const baggageMatch = text.match(/Checked-in baggage\s+(\d+Kg)/);
  const baggage = baggageMatch ? baggageMatch[1] : "Not found";

  // Departure Terminal (if mentioned)
  const terminalMatch = text.match(/Departure Terminal:\s+(\w+)/);
  const terminal = terminalMatch ? terminalMatch[1] : "Not found";

  // Base Price- not present in input file
  const basePriceMatch = text.match(/Adult Base Price:\s+(\d+\.?\d*)/);
  const basePrice = basePriceMatch ? basePriceMatch[1] : "Not found";

  // Airport Tax
  const airportTaxMatch = text.match(/Adult Airport Tax:\s+(\d+\.?\d*)/);
  const airportTax = airportTaxMatch ? airportTaxMatch[1] : "Not found";

  // Service Tax
  const serviceTaxMatch = text.match(/Adult Service Tax:\s+(\d+\.?\d*)/);
  const serviceTax = serviceTaxMatch ? serviceTaxMatch[1] : "Not found";

  // Total Price
  const totalPriceMatch = text.match(/Adult Total Price:\s+(\d+\.?\d*)/);
  const totalPrice = totalPriceMatch ? totalPriceMatch[1] : "Not found";

  return {
    name,
    dob,
    passportNumber,
    airlineName,
    flightNumber,
    cabin,
    stops,
    pnr,
    eTicket,
    originAirport,
    originCityCountry,
    destinationAirport,
    destinationCityCountry,
    date,
    time,
    baggage,
    terminal,
    basePrice,
    airportTax,
    serviceTax,
    totalPrice,
  };
}

function RoundTripExtractFields(text) {
  // Passenger or Traveler Names
  const nameMatches = [
    ...text.matchAll(/(?:Passenger’s Name|Traveler|Traveller):?\s*([A-Z\s]+)/g),
  ];
  const names = nameMatches.map((match) => match[1].trim());

  // // Passport Numbers
  // const passportMatches = [...text.matchAll(/Passport Number\s*([A-Z0-9]+)/g)];
  // const passportNumbers = passportMatches.map((match) => match[1]);

  // Flight Numbers
  const flightNumberMatches = [...text.matchAll(/Flight No\s+(\d+)/g)];
  const flightNumbers = flightNumberMatches.map((match) => match[1]);

  // Airline Names
  const airlineMatches = [...text.matchAll(/Airline:\s*([A-Za-z\s]+)/g)];
  const airlines = airlineMatches.map((match) => match[1].trim());

  // Airline PNRs
  const pnrMatches = [...text.matchAll(/Airline PNR:\s*(\d+)/g)];
  const airlinePnrs = pnrMatches.map((match) => match[1]);

  // Cabin Classes
  const cabinMatches = [...text.matchAll(/Cabin\/Class\s*([A-Za-z]+)/g)];
  const cabins = cabinMatches.map((match) => match[1]);

  // Baggage Allowance
  const baggageMatches = [...text.matchAll(/Baggage\s+(\d+\s?KG)/g)];
  const baggageAllowances = baggageMatches.map((match) => match[1]);

  // Origin and Destination
  const originMatches = [...text.matchAll(/Depart\s+(.+)\nDate/g)];
  const origins = originMatches.map((match) => match[1].trim());

  const destinationMatches = [...text.matchAll(/Arrive\s+(.+)\nDate/g)];
  const destinations = destinationMatches.map((match) => match[1].trim());

  // Dates
  const dateMatches = [...text.matchAll(/\b\d{2} [A-Za-z]+ \d{4}\b/g)];
  const dates = dateMatches.map((match) => match[0]);

  // Times
  const timeMatches = [...text.matchAll(/\b\d{2}:\d{2}\b/g)];
  const times = timeMatches.map((match) => match[0]);

  // Price Details
  const basePriceMatch = text.match(/Adult Base Price:\s*([\d,]+)/i);
  const basePrice = basePriceMatch ? basePriceMatch[1] : "Not found";

  const airportTaxMatch = text.match(/Adult Airport Tax:\s*([\d,]+)/i);
  const airportTax = airportTaxMatch ? airportTaxMatch[1] : "Not found";

  const serviceTaxMatch = text.match(/Adult Service Tax:\s*([\d,]+)/i);
  const serviceTax = serviceTaxMatch ? serviceTaxMatch[1] : "Not found";

  const totalPriceMatch = text.match(/Adult Total Price:\s*([\d,]+)/i);
  const totalPrice = totalPriceMatch ? totalPriceMatch[1] : "Not found";

  return {
    names,
    // passportNumbers,
    flightNumbers,
    airlines,
    airlinePnrs,
    cabins,
    baggageAllowances,
    origins,
    destinations,
    dates,
    times,
    priceDetails: {
      basePrice,
      airportTax,
      serviceTax,
      totalPrice,
    },
  };
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
