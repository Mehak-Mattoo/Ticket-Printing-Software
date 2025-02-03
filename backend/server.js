const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

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

app.get("/api/", (req, res) => {
  res.send("PDF-Parser Server is running. Welcome!");
});

// Temporary directory for storing files
const tempDirectory = path.join(__dirname, "temp");
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory);
}

let uploadedFile = null;
// Upload PDF and parse its content
app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
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

app.get("/api/extract-one-way-pdf-details", async (req, res) => {
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

app.get("/api/extract-two-way-pdf-details", async (req, res) => {
  try {
    if (!uploadedFile) {
      return res
        .status(400)
        .json({ success: false, message: "No PDF uploaded" });
    }

    const data = await pdfParse(uploadedFile);

    const extractedData = RoundTripExtractFields(data.text);

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
  console.log(text);
  const nameMatch = text.match(
    /(?:Passenger’s Name|Traveller)\s+([A-Z][A-Z\s]*)\n/
  );
  const name = nameMatch ? nameMatch[1].trim() : null;

  // Passport Number
  const passportMatch = text.match(/Passport Number\s+([A-Z0-9]+)/);
  const passportNumber = passportMatch ? passportMatch[1] : null;

  const dobMatch = text.match(
    /\b(?:DOB|Date of Birth):?\s*(\d{2}[-/]\d{2}[-/]\d{4})\b/
  );
  const dob = dobMatch ? dobMatch[1].trim() : null;

  // Airline Name
  const airlineMatches = text.match(/Airline\s*:\s*([^\n]+)/);
  const airlineName = airlineMatches ? airlineMatches[1].trim() : null;

  // Flight Number
  const flightNumberMatch = text.match(/Flight (?:Number|No):\s+(\w+\d+)/);
  const flightNumber = flightNumberMatch ? flightNumberMatch[1] : null;

  // Cabin
  const cabinMatch = text.match(/Cabin Class:\s+([A-Za-z]+)/);
  const cabin = cabinMatch ? cabinMatch[1] : null;

  // Stops
  const stopsMatch = text.match(/Stop:.*?(\d+H \d+M)/);
  const stops = stopsMatch ? stopsMatch[1] : "0";

  // Airline PNR
  const pnrMatch = text.match(/Airline reservation code \(PNR\):\s+(\w+)/);
  const pnr = pnrMatch ? pnrMatch[1] : null;

  // E-ticket Number
  const ticketMatch = text.match(/Ticket Number:\s+(\d+)/);
  const eTicket = ticketMatch ? ticketMatch[1] : null;

  const originAirportMatch = text.match(
    /(?:Origin|Arrive):?\s*([\w\s]+)\s*\(([^)]+)\)/i
  );
  const originAirport = originAirportMatch
    ? originAirportMatch[1].trim()
    : null;

  const originCityCountry = originAirportMatch
    ? originAirportMatch[2].trim()
    : null;

  // Extract Destination Airport Name

  const destinationAirportMatch = text.match(
    /(?:Destination|Depart):?\s*([\w\s]+)\s*\(([^)]+)\)/i
  );
  const destinationAirport = destinationAirportMatch
    ? destinationAirportMatch[1].trim()
    : null;

  // Extract Destination City and Country
  const destinationCityCountryMatch = text.match(
    /Destination\s+[\w\s()]+\n(.+)\n/
  );
  const destinationCityCountry = destinationCityCountryMatch
    ? destinationCityCountryMatch[1].trim()
    : null;

  // Date
  const dateMatch = text.match(/\b\d{2} [A-Za-z]+ \d{4}\b/);
  const date = dateMatch ? dateMatch[0] : null;

  // Time
  const timeMatch = text.match(/\b\d{2}:\d{2}\b/);
  const time = timeMatch ? timeMatch[0] : null;

  // Baggage

  const baggageMatch = text.match(/Checked-in baggage\s+(\d+\s?Kg)/i);
  const baggage = baggageMatch ? baggageMatch[1].trim() : null;

  // Departure Terminal (if mentioned)
  const terminalMatch = text.match(/Departure Terminal:\s+(\w+)/);
  const terminal = terminalMatch ? terminalMatch[1] : null;

  // Base Price- not present in input file
  const basePriceMatch = text.match(/Adult Base Price:\s+(\d+\.?\d*)/);
  const basePrice = basePriceMatch ? basePriceMatch[1] : null;

  // Airport Tax
  const airportTaxMatch = text.match(/Adult Airport Tax:\s+(\d+\.?\d*)/);
  const airportTax = airportTaxMatch ? airportTaxMatch[1] : null;

  // Service Tax
  const serviceTaxMatch = text.match(/Adult Service Tax:\s+(\d+\.?\d*)/);
  const serviceTax = serviceTaxMatch ? serviceTaxMatch[1] : null;

  // Total Price
  const totalPriceMatch = text.match(/Adult Total Price:\s+(\d+\.?\d*)/);
  const totalPrice = totalPriceMatch ? totalPriceMatch[1] : null;

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

// function RoundTripExtractFields(text) {
//   console.log(text);

//   const travellers=[];
//     const travelerBlocks = text.split(
//       /\n(?=Passenger’s Name|Traveller|Traveler)/g
//     );

//   // Normalize the text for easier regex matching
//   const normalizedText = text
//     .replace(/\s+/g, " ") // Replace multiple spaces and line breaks with a single space
//     .replace(/\n/g, " ") // Remove newline characters
//     .replace(/\s{2,}/g, " "); // Replace multiple spaces with a single space

//   // Passenger or Traveler Names
//    travelerBlocks.forEach((block) => {
//   const nameMatches = [
//     ...normalizedText.matchAll(
//       /(?:Passenger’s Name|Traveler|Traveller|Traveler):?\s*([A-Z\s]+)(?=\s|$)/g
//     ),
//   ];
//   const names = nameMatches.map((match) => match[1].trim());

//   // Passport Numbers
//   const passportMatches = [
//     ...normalizedText.matchAll(/Passport Number\s*([A-Z0-9]+)/g),
//   ];
//   const passportNumbers = passportMatches.map((match) => match[1]);

//   // Flight Numbers
//   const flightNumberMatches = [
//     ...normalizedText.matchAll(/Flight\s+Details\s+(\d+)/g),
//   ];
//   const flightNumbers = flightNumberMatches.map((match) => match[1]);

//   // Airline Code and Name

//    const airlineMatches = [
//      ...normalizedText.matchAll(/(\w{1,2})\s?\(([^)]+)\)/g),
//    ];

//    const airlines = airlineMatches.map((match) => ({
//      code: match[1].trim(),
//      name: match[2].trim(),
//    }));

//   // Airline PNRs
//   const pnrMatches = [...normalizedText.matchAll(/Airline PNR:\s*(\d+)-?/g)];
//   const airlinePnrs = pnrMatches.map((match) => match[1]);

//   // Cabin Classes
//   const cabinMatches = [
//     ...normalizedText.matchAll(/Cabin\/Class\s*([A-Za-z]+)/g),
//   ];
//   const cabins = cabinMatches.map((match) => match[1]);

//   // Baggage Allowance
//   const baggageMatches = [...normalizedText.matchAll(/Baggage\s+(\d+\s?KG)/g)];
//   const baggageAllowances = baggageMatches.map((match) => match[1]);

//   // Origin and Destination
//   const originMatches = [...normalizedText.matchAll(/Depart\s+(.+?)\s+Date/g)];
//   const origins = originMatches.map((match) => match[1].trim());

//   const destinationMatches = [
//     ...normalizedText.matchAll(/Arrive\s+(.+?)\s+Date/g),
//   ];
//   const destinations = destinationMatches.map((match) => match[1].trim());

//   // Dates
//   const dateMatches = [
//     ...normalizedText.matchAll(/\bDate\s+(\d{2})\s+([A-Za-z]+)\s+(\d{4})\b/g),
//   ];
//   const dates = dateMatches.map(
//     (match) => `${match[1]} ${match[2]} ${match[3]}`
//   );

//   // Times
//   const timeMatches = [...normalizedText.matchAll(/\b\d{2}:\d{2}\b/g)];
//   const times = timeMatches.map((match) => match[0]);

//   // Price Details
//   const basePriceMatch = normalizedText.match(
//     /Adult Base Price:\s*([\d,]+)\s*\(x\s1\)/
//   );
//   const basePrice = basePriceMatch ? basePriceMatch[1] : "Not found";

//   const airportTaxMatch = normalizedText.match(
//     /Adult Airport Tax:\s*([\d,]+)\s*\(x\s1\)/
//   );
//   const airportTax = airportTaxMatch ? airportTaxMatch[1] : "Not found";

//   const serviceTaxMatch = normalizedText.match(
//     /Adult Service Tax:\s*([\d,]+)\s*\(x\s1\)/
//   );
//   const serviceTax = serviceTaxMatch ? serviceTaxMatch[1] : "Not found";

//   const totalPriceMatch = normalizedText.match(
//     /Adult Total Price:\s*([\d,]+)\s*\(x\s1\)/
//   );
//   const totalPrice = totalPriceMatch ? totalPriceMatch[1] : "Not found";

//    travelers.push({
//     names,
//     passportNumbers,
//     flightNumbers,
//     airlines,
//     airlinePnrs,
//     cabins,
//     baggageAllowances,
//     origins,
//     destinations,
//     dates,
//     times,
//     priceDetails: {
//       basePrice,
//       airportTax,
//       serviceTax,
//       totalPrice,
//      },
//     });

//   });
// return travelers

// }
function RoundTripExtractFields(text) {
  console.log(text);

  
 const normalizedText = text
    .replace(/\s+/g, " ") // Replace multiple spaces and line breaks with a single space
    .replace(/\n/g, " ") // Remove newline characters
    .replace(/\s{2,}/g, " "); // Replace multiple spaces with a single space

  const travelers = [];
  const travelerBlocks = normalizedText.split(/\n(?=Passenger’s Name|Traveller|Traveler)/g);


  travelerBlocks.forEach((block) => {
    const nameMatch = block.match(
      /(?:Passenger’s Name|Traveler|Traveller):?\s*([A-Za-z\s]+)(?=\s|$)/
    );

    const name = nameMatch ? nameMatch[1].trim() : null;

    // Passport Numbers
    const passportMatches = [
      ...block.matchAll(/Passport Number\s*([A-Z0-9]+)/g),
    ];
    const passportNumbers = passportMatches.map((match) => match[1]);

    const flightNumberMatch = block.match(/MAHAN AIR\s?\(W5\)\s*(\d{3})/);
    const flightNumber = flightNumberMatch ? flightNumberMatch[1] : null;

    const airlineMatch = block.match(/MAHAN AIR\s?\(W5\)/);
    const airline = airlineMatch ? { code: "W5", name: "MAHAN AIR" } : null;

    const pnrMatch = block.match(/Airline PNR:\s*(\d+)/);
    const airlinePnr = pnrMatch ? pnrMatch[1] : null;


    const cabinMatch = block.match(/Economy/);
    const cabin = cabinMatch ? "Economy" : null;

    const baggageMatch = block.match(/30 KG/);
    const baggageAllowance = baggageMatch ? "30 KG" : null;

    const originMatch = block.match(/Depart:\s*([A-Za-z\s]+)/);
    const origin = originMatch ? originMatch[1].trim() : null;

    const destinationMatch = block.match(/Arrive:\s*([A-Za-z\s]+)/);
    const destination = destinationMatch ? destinationMatch[1].trim() : null;


    const dateMatch = [
      ...block.matchAll(/Date[\s\n]*([\d]{2}\s[A-Za-z]+\s\d{4})/g),
    ];
    const date = dateMatch.map((match) => match[1]);


const timeMatch = [...block.matchAll(/Time[\s\n]*([\d]{2}:[\d]{2})/g)];

// Extract the matched times
const time = timeMatch.map((match) => match[1]);


    const basePriceMatch = block.match(
      /Adult Base Price:\s*([\d,]+)\s*\(x\s1\)/
    );
    const basePrice = basePriceMatch ? basePriceMatch[1] : "Not found";

    const airportTaxMatch = block.match(
      /Adult Airport Tax:\s*([\d,]+)\s*\(x\s1\)/
    );
    const airportTax = airportTaxMatch ? airportTaxMatch[1] : "Not found";

    const serviceTaxMatch = block.match(
      /Adult Service Tax:\s*([\d,]+)\s*\(x\s1\)/
    );
    const serviceTax = serviceTaxMatch ? serviceTaxMatch[1] : "Not found";

    const totalPriceMatch = block.match(
      /Adult Total Price:\s*([\d,]+)\s*\(x\s1\)/
    );
    const totalPrice = totalPriceMatch ? totalPriceMatch[1] : "Not found";

    if (
      name ||
      flightNumber ||
      airline ||
      airlinePnr ||
      cabin ||
      baggageAllowance ||
      origin ||
      destination ||
      date ||
      time
    ) {
      travelers.push({
        name,
        passportNumbers,
        flightNumber,
        airline,
    
        destination,
        airlinePnr,
        cabin,
        baggageAllowance,
        origin,
        destination,
        date,
        time,
        priceDetails: {
          basePrice,
          airportTax,
          serviceTax,
          totalPrice,
        },
      });
    }
  });

  return travelers;
}





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
