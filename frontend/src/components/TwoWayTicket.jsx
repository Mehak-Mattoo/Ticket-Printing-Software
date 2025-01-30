import React, { useState, useEffect } from "react";
import header from "../../src/assets/header.png";
import logo from "../../src/assets/agencylogo.png";
import "../App.css";
import { useLocation } from "react-router-dom";
import PrimaryBtn from "../helper/PrimaryBtn";
import { airlineLogos } from "../constant";

const TwoWayTicket = () => {
  const location = useLocation();
  const { extractedData } = location.state || {};

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
        name: extractedData.names[0] || "", // Get the first name if available
        passportNum: extractedData.passportNumbers[0] || "", // Get the first passport number
        DOB: extractedData.dates[0] || "", // Get the first date (assuming DOB is the first date)
        status: "Confirmed", // Since it's not available in the extracted data, leave it empty or set to a default value
      }));

      // Update flight state
      setFlight((prevState) => ({
        ...prevState,
        airline: extractedData.airlines[0] || "",
        flightNum: extractedData.flightNumbers[0] || "",
        cabin: extractedData.cabins[0] || "Economy",
        stop: extractedData.airlinePnrs.length || 0,
        airlinePNR: extractedData.airlinePnrs[0] || "",
        eTicketNum: "",
        origin: extractedData.origins[0] || "",
        destination: extractedData.destinations[0] || "",
        date: extractedData.dates[0] || "",
        time: extractedData.times[0] || "",
        baggage: extractedData.baggageAllowances[0] || "30 KG",
        departureTerminal: "IKA (Tehran,Imam Khomeini Intl, Iran",
      }));

      // Update price state
      setPrice((prevState) => ({
        ...prevState,
        basePrice:
          parseFloat(
            extractedData.priceDetails.basePrice.replace(/[^0-9.-]+/g, "")
          ) || 0, // Remove commas and parse as number
        airportTax:
          parseFloat(
            extractedData.priceDetails.airportTax.replace(/[^0-9.-]+/g, "")
          ) || 0,
        serviceTax:
          parseFloat(
            extractedData.priceDetails.serviceTax.replace(/[^0-9.-]+/g, "")
          ) || 0,
        totalPrice:
          parseFloat(
            extractedData.priceDetails.totalPrice.replace(/[^0-9.-]+/g, "")
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
          <div className="mx-3 text-xs">
            <h2 className="bg-skyBlue font-bold">PASSENGER DETAILS</h2>
            <div className="">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full ">
                <thead className="">
                  <tr className="">
                    <th className="border border-cyan-500 border-3 ">
                      Passenger's name
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
                <tbody className="bg-[#cef1f9] colored text-center align-middle font-semibold">
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
          <div className="mx-3 text-xs">
            <h2 className="bg-skyBlue colored font-bold">AGENT DETAILS</h2>
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
            <div className="mx-3 text-xs">
              <h2 className="bg-skyBlue  colored font-bold">FLIGHT DETAILS</h2>

              <div className="">
                <div>
                  {flight.airline && airlineLogos[flight.airline] && (
                    <img
                      src={airlineLogos[flight.airline]}
                      alt={`${flight.airline} Logo`}
                      className="w-20 mt-10"
                    />
                  )}

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
                      {extractedData.names?.map((pnr, idx) => (
                        <tr key={idx}>
                          <td className="border border-cyan-500 whitespace-normal py-2 ">
                            <input
                              type="text"
                              name="pnr"
                              value={
                                extractedData.airlines[0].name ||
                                "Unknown Airline"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500  whitespace-normal py-2 ">
                            <input
                              type="text"
                              value={0}
                              name="airline"
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 whitespace-normal py-2 ">
                            <input
                              type="text"
                              name="origin"
                              value={"Economy"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500  whitespace-normal py-2 ">
                            <input
                              type="text"
                              name="destination"
                              value={extractedData.stop || "0"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 whitespace-normal py-2 ">
                            <input
                              type="text"
                              name="date"
                              value={extractedData.airlinePnrs[0]}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 whitespace-normal py-2 ">
                            <input
                              type="text"
                              name="time"
                              value={"0"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* Second part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          Origin
                        </th>
                        <th className="font-bold border border-cyan-500  ">
                          Destination
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
                    <tbody className="bg-bgBlue colored text-center align-middle border border-borderBlue">
                      {extractedData.names?.map((pnr, idx) => (
                        <tr key={idx}>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="origin"
                              value={
                                extractedData.origins?.[idx] || "Unknown Origin"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="destination"
                              value={
                                extractedData.destinations?.[0] ||
                                "Unknown Destination"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="date"
                              value={extractedData.dates?.[0] || "Unknown Date"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="time"
                              value={
                                extractedData.times?.[idx] || "Unknown Time"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="baggage"
                              value={extractedData.baggage?.[idx] || "30 KG"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="departureTerminal"
                              value={
                                extractedData.airlines?.[0].name ||
                                "Unknown Terminal"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                        </tr>
                      ))}
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
                      {extractedData.names?.map((pnr, idx) => (
                        <tr key={idx}>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="pnr"
                              value={
                                extractedData.airlines[0].name ||
                                "Unknown Airline"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="airline"
                              value={0}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="origin"
                              value={"Economy"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="destination"
                              value={extractedData.stop || "0"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="date"
                              value={extractedData.airlinePnrs[1]}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="time"
                              value={"0"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* Second part of the table */}
                    <thead>
                      <tr className="border">
                        <th className="font-bold border border-cyan-500 ">
                          Origin
                        </th>
                        <th className="font-bold border border-cyan-500 ">
                          Destination
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
                      {extractedData.names?.map((pnr, idx) => (
                        <tr key={idx}>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="origin"
                              value={
                                extractedData.origins?.[1] || "Unknown Origin"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="destination"
                              value={
                                extractedData.destinations?.[1] ||
                                "Unknown Destination"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="date"
                              value={extractedData.dates?.[2] || "Unknown Date"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="time"
                              value={extractedData.times?.[3] || "Unknown Time"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="baggage"
                              value={extractedData.baggage?.[idx] || "30 KG"}
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                          <td className="border border-cyan-500 py-2 whitespace-normal">
                            <input
                              type="text"
                              name="departureTerminal"
                              value={
                                extractedData.airlines?.[0].name ||
                                "Unknown Terminal"
                              }
                              onChange={(e) => handleFlightChange(e, idx)}
                              className="w-full text-center bg-transparent"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4 table */}

            <div className="mx-3 text-xs">
              <h2 className="bg-skyBlue colored font-bold">PRICE DETAILS</h2>

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
