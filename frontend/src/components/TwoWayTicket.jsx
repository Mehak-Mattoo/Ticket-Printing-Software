import React, { useState, useEffect } from "react";
import header from "../../src/assets/header.png";
import logo from "../../src/assets/agencylogo.png";
import "../App.css";
import { useLocation } from "react-router-dom";
import PrimaryBtn from "../helper/PrimaryBtn";
import { airlineLogos } from "../constant";

const TwoWayTicket = () => {
  const location = useLocation();
  const { extractedData , ticketType } = location.state || {};

  const [passenger, setPassenger] = useState({
    name: "",
    passportNum: 0,
    DOB: 0,
    status: "",
  });

  const [flight, setFlight] = useState({
    airline: "",
    FlightNum: 0,
    cabin: "",
    stop: 0,
    airlinePNR: 0,
    ETicketNum: 0,
    origin: "",
    destination: "",
    date: 0,
    time: 0,
    baggage: "",
    departureTerminal: "",
  });

  const [price, setPrice] = useState({
    basePrice: 0,
    airportTax: 0,
    serviceTax: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (extractedData) {
      console.log(extractedData);

      // Update passenger state
      setPassenger((prevState) => ({
        ...prevState,
        name: extractedData[0][0].name || "", // Get the first name if available
        passportNum: extractedData[0].passportNumber || "", // Get the first passport number
        DOB: "", // Get the first date (assuming DOB is the first date)
        status: "Confirmed", // Since it's not available in the extracted data, leave it empty or set to a default value
      }));

      // Update flight state
      setFlight((prevState) => ({
        ...prevState,
        airline: extractedData[0].airline || "",
        flightNum: extractedData[0].flightNumber || "",
        cabin: extractedData[0].cabins || "Economy",
        // stop: extractedData[0].airlinePnrs.length || 0,
        airlinePNR: extractedData[0].airlinePnr || "",
        // eTicketNum: "",
        origin: extractedData[0].origin || "",
        destination: extractedData[0].destination || "",
        date: extractedData[0].date || "",
        time: extractedData[0].time || "",
        baggage: extractedData[0].baggageAllowance || "30 KG",
        departureTerminal: "IKA (Tehran,Imam Khomeini Intl, Iran",
      }));
      

      // Update price state
      setPrice((prevState) => ({
        ...prevState,
        basePrice:
          parseFloat(
            extractedData[0][0].priceDetails.basePrice?.replace(/[^0-9.-]+/g, "")
          ) || 0, // Remove commas and parse as number
        airportTax:
          parseFloat(
            extractedData[0][0].priceDetails.airportTax?.replace(
              /[^0-9.-]+/g,
              ""
            )
          ) || 0,
        serviceTax:
          parseFloat(
            extractedData[0][0].priceDetails.serviceTax?.replace(
              /[^0-9.-]+/g,
              ""
            )
          ) || 0,
        totalPrice:
          parseFloat(
            extractedData[0][0].priceDetails.totalPrice?.replace(
              /[^0-9.-]+/g,
              ""
            )
          ) || 0,
      }));
    }
  }, [extractedData]);

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prevState) => ({
      ...prevState,
      [name]: parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    console.log("price", extractedData[0][0].priceDetails.basePrice);
    
  }, []);


  return (
    <>
      <div>
        {/* Back Button */}

        <div className="p-2 flex justify-between items-center bg-gray-50 rounded-lg shadow-sm">
          <PrimaryBtn
            bgColor="bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              window.history.back(); // Navigate back to the previous page
            }}
            className="btn-to-hide px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Back
          </PrimaryBtn>

          <PrimaryBtn
            bgColor="bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              window.print();
            }}
            className="btn-to-hide px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Download
          </PrimaryBtn>
        </div>

        <img src={header} className="w-full h-32" alt="smh-agency" />
        <div className="">
          <img className="w-1/6 ml-5" src={logo} alt="smh-agency" />

          {/* 1st table */}
          <div className=" text-sm">
            <h2 className="bg-skyBlue  my-2">PASSENGER DETAILS</h2>
            <div className="">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full ">
                <thead className="">
                  <tr className="">
                    <th className="border border-cyan-500 border-3 ">
                      {ticketType === "D1" ? "TRAVELER" : "Passenger's name"}
                    </th>
                    <th className="border border-cyan-500 border-3">
                      Passport No.
                    </th>
                    <th className="border border-cyan-500 border-3 ">
                      Date of Birth
                    </th>
                    <th className="border border-cyan-500 border-3 ">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-[#cef1f9] colored text-center">
                  <tr className="">
                    <td className="border border-cyan-500 py-2">
                      <input
                        type="text"
                        name="name"
                        value={passenger.name}
                        onChange={handlePassengerChange}
                        className="w-full text-center bg-transparent"
                      />
                    </td>
                    <td className="border border-cyan-500 py-2">
                      <input
                        type="text"
                        name="passportNum"
                        value={passenger.passportNum}
                        onChange={handlePassengerChange}
                        className="w-full text-center bg-transparent"
                      />
                    </td>
                    <td className="border border-cyan-500 py-2">
                      <input
                        type="text"
                        name="DOB"
                        value={passenger.DOB}
                        onChange={handlePassengerChange}
                        className="w-full text-center bg-transparent"
                      />
                    </td>
                    <td className="border border-cyan-500 py-2">
                      <input
                        type="text"
                        name="status"
                        value={passenger.status}
                        onChange={handlePassengerChange}
                        className="w-full text-center bg-transparent"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2nd table */}
          <div className=" text-sm">
            <h2 className="bg-skyBlue colored  my-2">AGENT DETAILS</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full">
                <thead>
                  <tr className="border">
                    <th className="border border-cyan-500 ">Agent's Details</th>
                    <th className="border border-cyan-500 ">Support No.</th>
                    <th className="border border-cyan-500 ">Phone No.</th>
                    <th className="border border-cyan-500 ">E-mail</th>
                  </tr>
                </thead>
                <tbody className="bg-[#cef1f9] colored text-center align-middle border border-borderBlue">
                  <tr className="">
                    <td className="font-bold border border-cyan-500 py-2">
                      SMH Travel Agency
                    </td>

                    <td className="border border-cyan-500 py-2 font-bold">
                      +989370291702
                    </td>
                    <td className="border border-cyan-500 py-2 font-bold">
                      +91904544484
                    </td>
                    <td className="font-bold border border-cyan-500 py-2">
                      @smhtravelagency@gmail.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="img-bg">
            {/* 3rd table- 1st part */}
            {/* 3rd table- 2nd part */}
            <div className="text-sm">
              <h2 className="bg-skyBlue  colored  my-2">FLIGHT DETAILS</h2>

              <div className="">
                <div>
                  {/* {flight.airline && airlineLogos[flight.airline] && (
                    <img
                      src={airlineLogos[flight.airline]}
                      alt={`${flight.airline} Logo`}
                      className="w-20 mt-10"
                    />
                  )} */}

                  <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full">
                    {/* First part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          Airline
                        </th>
                        <th className="font-bold border border-cyan-500">
                          Flight No./Aircraft Type
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Cabin
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Stop
                        </th>
                        <th className="font-bold border border-cyan-500">
                          Airline PNR
                        </th>
                        <th className="font-bold border border-cyan-500">
                          E-Ticket Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#cef1f9] colored text-center align-middle border border-borderBlue">
                      {/* {extractedData.names?.map((pnr, idx) => ( */}
                      <tr>
                        <td className="border border-cyan-500 whitespace-normal py-2 ">
                          <input
                            type="text"
                            name="firstAirlineName"
                            value={flight.airline || "Unknown Airline"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500  whitespace-normal py-2 ">
                          <input
                            type="text"
                            value={0}
                            name="firstAirlineNum"
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 whitespace-normal py-2 ">
                          <input
                            type="text"
                            name="firstAirlineCabin"
                            value={"Economy"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[2rem] border-cyan-500  whitespace-normal py-2 ">
                          <input
                            type="text"
                            name="firstAirlineStop"
                            value={extractedData.stop || "0"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[7rem] border-cyan-500 whitespace-normal py-2 ">
                          <input
                            type="text"
                            name="firstAirlinePNR"
                            value={flight.airlinePNR}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 whitespace-normal py-2 ">
                          <input
                            type="text"
                            name="firstAirlineETicketNum"
                            value={flight.ETicketNum || "0"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                      </tr>
                      {/* ))} */}
                    </tbody>

                    {/* Second part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          {ticketType === "D1" ? "Depart" : "Origin"}
                        </th>
                        <th className="font-bold border border-cyan-500  ">
                          {ticketType === "D1" ? "Arrive" : "Destination"}
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Date
                        </th>
                        <th className="font-bold border border-cyan-500">
                          Time
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Baggage
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Departure Terminal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-bgBlue colored text-center border border-borderBlue">
                      <tr>
                        <td className="border w-[16rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineOrigin"
                            value={
                              flight.origin ||
                              "IMAM KHOMEINI INTL (IKA,Tehran,Iran)"
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  w-[14rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineDestination"
                            value={
                              flight.destination ||
                              "INDIRA GANDHI INTL (DEL,Delhi,India)"
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  w-[7rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineDate"
                            value={flight.date?.[0] || "6-10-2025"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[4.6rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineTime"
                            value={flight.time?.[0] || "02.00"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineBaggage"
                            value={flight.baggage || "30 KG"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  w-[15rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="firstAirlineDepartureTerminal"
                            value={
                              flight.origin ||
                              "IMAM KHOMEINI INTL (IKA,Tehran,Iran)"
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full">
                    {/* First part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          Airline
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Flight No./Aircraft Type
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Cabin
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Stop
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Airline PNR
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          E-Ticket Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#cef1f9] colored text-center align-middle border border-borderBlue">
                      <tr>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineName"
                            value={flight.airline || "Unknown Airline"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineNum"
                            value={flight.flightNum || "0"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineCabin"
                            value={"Economy"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineStop"
                            value={extractedData.stop || "0"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[5rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlinePNR"
                            value={flight.airlinePNR}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineETicketNum"
                            value={"0"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                      </tr>
                      {/* ))} */}
                    </tbody>

                    {/* Second part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          {ticketType === "D1" ? "Depart" : "Origin"}
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          {ticketType === "D1" ? "Arrive" : "Destination"}
                        </th>
                        <th className="font-bold border border-cyan-500">
                          Date
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Time
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Baggage
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Departure Terminal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-bgBlue colored text-center align-middle border border-borderBlue">
                      {/* {extractedData.names?.map((pnr, idx) => ( */}
                      <tr>
                        <td className="border  w-[13.5rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineOrigin"
                            value={
                              flight.origin ||
                              "INDIRA GANDHI INTL (DEL,Delhi,India)"
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  w-[14.2rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineDestination"
                            value={
                              flight.destination ||
                              "IMAM KHOMEINI INTL (IKA,Tehran,Iran) "
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border  w-[6rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineDate"
                            value={flight.date?.[2] || "12-3-2025"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[6rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineTime"
                            value={flight.time?.[2] || "00:00"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlinebaggage"
                            value={extractedData.baggage?.[idx] || "30 KG"}
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                        <td className="border w-[14rem] border-cyan-500 py-2 whitespace-normal">
                          <input
                            type="text"
                            name="secondAirlineDepartureTerminal"
                            value={
                              extractedData.airlines?.[2].name ||
                              "INDIRA GANDHI INTL (DEL,Delhi,India)"
                            }
                            onChange={handleFlightChange}
                            className="w-full text-center bg-transparent"
                          />
                        </td>
                      </tr>
                      {/* ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4 table */}

            <div className=" text-sm">
              <h2 className="bg-skyBlue colored my-2">PRICE DETAILS</h2>

              <div className="border border-cyan-500 border-3 max-w-md my-3">
                <div className="flex justify-between border-b text-center border-cyan-500">
                  <div className="font-semibold w-1/2">Base Price</div>
                  <div className="font-bold w-1/2 border-cyan-500 border-l-2">
                    <input
                      type="number"
                      name="basePrice"
                      value={price.basePrice}
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-between border-b text-center border-cyan-500 colored bg-bgBlue">
                  <div className="font-semibold w-1/2">Airport Tax</div>
                  <div className="font-bold w-1/2 border-cyan-500 border-l-2">
                    <input
                      type="number"
                      name="airportTax"
                      value={price.airportTax}
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-between border-b text-center border-cyan-500">
                  <div className="font-semibold w-1/2">Service Tax</div>
                  <div className="font-bold w-1/2 border-cyan-500 border-l-2">
                    <input
                      type="number"
                      name="serviceTax"
                      value={price.serviceTax}
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-center colored bg-bgBlue">
                  <div className="font-semibold w-1/2">Total Price</div>
                  <div className="font-bold w-1/2 border-cyan-500 border-l-2">
                    <input
                      type="number"
                      name="totalPrice"
                      value={price.totalPrice}
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoWayTicket;
