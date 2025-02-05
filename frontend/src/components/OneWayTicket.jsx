import React, { useState, useEffect } from "react";
import header from "../../src/assets/header.png";
import logo from "../../src/assets/agencylogo.png";
import "../App.css";
import PrimaryBtn from "../helper/PrimaryBtn";
import { airlineLogos } from "../constant";

const OneWayTicket = ({ extractedData, ticketType }) => {
  const [passenger, setPassenger] = useState({
    name: "",
    passportNum: "",
    DOB: "",
    status: "",
  });

  const [flight, setFlight] = useState({
    airline: "",
    flightNum: "",
    cabin: "",
    stop: "",
    airlinePNR: "",
    eTicketNum: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
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
      setPassenger({
        name: extractedData.name || "",
        passportNum: extractedData.passportNumber || "0",
        DOB: extractedData.dob || "0",
        status: extractedData.status || "Confirmed",
      });

      setFlight({
        airline: extractedData.airlineName || "Mahan Air",
        flightNum: extractedData.flightNumber || "0",
        cabin: extractedData.cabin || "Economy",
        stop: extractedData.stops || "0",
        airlinePNR: extractedData.pnr || "0",
        eTicketNum: extractedData.eTicket || "0",
        origin:
          extractedData.originAirport +
            ", " +
            extractedData.originCityCountry ||
          "IMAM KHOMEINI INTL (IKA, Tehran, Iran)",
        destination:
          extractedData.destinationAirport +
            ", " +
            extractedData.destinationCityCountry ||
          "INDIRA GANDHI INTL (DEL, Delhi, India)",
        date: extractedData.date || "",
        time: extractedData.time || "",
        baggage: extractedData.baggage || "30 kg",
        departureTerminal:
          extractedData.originAirport ||
          "IMAM KHOMEINI INTL (IKA, Tehran, Iran)",
      });

      setPrice({
        basePrice: extractedData.basePrice || 0,
        airportTax: extractedData.airportTax || 0,
        serviceTax: extractedData.serviceTax || 0,
        totalPrice: extractedData.totalPrice || 0,
      });
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

    // If the value is an empty string, set it to an empty string
    // Otherwise, parse it as a float
    const parsedValue = value === "" ? "" : parseFloat(value);

    setPrice((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  return (
    <>
    <div className="ticket-container">
      <div>
        <div className="p-2 flex justify-between items-center bg-gray-50 rounded-lg ">
          <PrimaryBtn
            bgColor="bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              window.history.back();
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
          <div className="mx-1 text-sm">
            <h2 className="colored bg-cyan-100 text-base my-2">
              PASSENGER DETAILS
            </h2>
            <div className="">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full mr-8">
                <thead className="">
                  <tr className=" font-serif">
                    <th className="border border-cyan-500 border-3 p-2">
                      {ticketType === "D1" ? "TRAVELER" : "Passenger's name"}
                    </th>
                    <th className="border border-cyan-500 border-3 ">
                      Passport No.
                    </th>
                    <th className="border border-cyan-500 border-3 ">
                      Date of Birth
                    </th>
                    <th className="border border-cyan-500 border-3 ">Status</th>
                  </tr>
                </thead>
                <tbody className="colored bg-cyan-100 text-center align-middle ">
                  <tr className="">
                    <td className="border border-cyan-500 ">
                      <input
                        type="text"
                        name="name"
                        value={passenger.name}
                        onChange={handlePassengerChange}
                        className="w-full text-center bg-transparent font-semibold"
                      />
                    </td>
                    <td className="border border-cyan-500 ">
                      <input
                        type="text"
                        name="passportNum"
                        value={passenger.passportNum}
                        onChange={handlePassengerChange}
                        className="w-full font-semibold text-center bg-transparent"
                      />
                    </td>
                    <td className="border border-cyan-500 ">
                      <input
                        type="text"
                        name="DOB"
                        value={passenger.DOB}
                        onChange={handlePassengerChange}
                        className="w-full font-semibold text-center bg-transparent"
                      />
                    </td>
                    <td className="border border-cyan-500 py-2">
                      <input
                        type="text"
                        name="status"
                        value={passenger.status || "Confirmed"}
                        onChange={handlePassengerChange}
                        className="w-full font-semibold text-center bg-transparent"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2nd table */}
          <div className="mx-1 text-sm ">
            <h2 className="colored bg-cyan-100 text-base my-2">
              AGENT DETAILS
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full">
                <thead>
                  <tr className="border  font-serif">
                    <th className="border border-cyan-500 p-2 ">
                      Agent's Details
                    </th>
                    <th className="border border-cyan-500 ">Support No.</th>
                    <th className="border border-cyan-500 ">Phone No.</th>
                    <th className="border border-cyan-500 ">E-mail</th>
                  </tr>
                </thead>
                <tbody className="bg-[#cef1f9] colored text-center align-middle border border-borderBlue">
                  <tr className="">
                    <td className="font-bold border border-cyan-500 ">
                      SMH Travel Agency
                    </td>

                    <td className="border border-cyan-500  font-bold py-2">
                      +989370291702
                    </td>
                    <td className="border border-cyan-500  font-bold">
                      +91904544484
                    </td>
                    <td className="font-bold border border-cyan-500 ">
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
            <div className="mx-1 text-sm">
              <h2 className="colored bg-cyan-100 text-base my-2">
                FLIGHT DETAILS
              </h2>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/6 flex ">
                  {flight.airline && airlineLogos[flight.airline] && (
                    <img
                      src={airlineLogos[flight.airline]}
                      alt={`${flight.airline} Logo`}
                      className="w-40 md:w-20  print:block"
                    />
                  )}
                </div>

                <table className="table-auto border-2 my-3 border-cyan-500 border-3 w-full">
                  <thead>
                    <tr className="border w-full  font-serif">
                      <th className="font-bold border border-cyan-500 p-2 ">
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
                      <th className="font-bold border  border-cyan-500 ">
                        E-Ticket Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#cef1f9] colored text-center align-middle border border-borderBlue">
                    <tr className="">
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="airline"
                          value={flight.airline}
                          onChange={handleFlightChange}
                          className="w-96 font-semibold text-center bg-transparent"
                        />
                      </td>
                      <td className="border  border-cyan-500  whitespace-normal py-2">
                        <input
                          type="text"
                          name="flightNum"
                          value={flight.flightNum}
                          onChange={handleFlightChange}
                          className="w-96 font-semibold text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="cabin"
                          value={flight.cabin}
                          onChange={handleFlightChange}
                          className="w-32 text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="stop"
                          value={flight.stop}
                          onChange={handleFlightChange}
                          className=" text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="airlinePNR"
                          value={flight.airlinePNR}
                          onChange={handleFlightChange}
                          className=" text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="eTicketNum"
                          value={flight.eTicketNum}
                          onChange={handleFlightChange}
                          className="w-96 text-center font-semibold bg-transparent"
                        />
                      </td>
                    </tr>
                  </tbody>

                  {/* 3rd table- 2nd part */}
                  <thead>
                    <tr className="border  font-serif">
                      <th className="font-bold border border-cyan-500 p-2 ">
                        {ticketType === "D1" ? "Depart" : "Origin"}
                      </th>
                      <th className="font-bold border border-cyan-500 ">
                        {ticketType === "D1" ? "Arrive" : "Destination"}
                      </th>
                      <th className="font-bold border border-cyan-500 ">
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
                    <tr className="">
                      <td className="border  w-[8rem] border-cyan-500  whitespace-normal py-2">
                        <input
                          type="text"
                          name="origin"
                          value={flight.origin}
                          onChange={handleFlightChange}
                          className="w-96 text-center bg-transparent"
                        />
                      </td>
                      <td className="border w-[11rem] border-cyan-500 py-1 whitespace-normal">
                        <input
                          type="text"
                          name="destination"
                          value={flight.destination}
                          onChange={handleFlightChange}
                          className="w-full min-w-full text-center bg-transparent"
                        />
                      </td>

                      <td className="border w-[6.3rem] border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="date"
                          value={flight.date}
                          onChange={handleFlightChange}
                          className="w-full text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="time"
                          value={flight.time}
                          onChange={handleFlightChange}
                          className="w-full text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="baggage"
                          value={flight.baggage}
                          onChange={handleFlightChange}
                          className="w-full text-center bg-transparent"
                        />
                      </td>
                      <td className="border border-cyan-500  whitespace-normal">
                        <input
                          type="text"
                          name="departureTerminal"
                          value={flight.departureTerminal}
                          onChange={handleFlightChange}
                          className="w-full text-center bg-transparent"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4 table */}

            <div className="mx-1 text-sm">
              <h2 className="colored bg-cyan-100 text-base my-2 ">
                PRICE DETAILS
              </h2>

              <div className="border border-cyan-500 border-3 max-w-md my-3">
                <div className="flex justify-between border-b text-center border-cyan-500">
                  <div className="font-bold w-1/2 p-2">Base Price</div>
                  <div className="font-semibold w-1/2 border-cyan-500 border-l-2 p-2">
                    <input
                      type="number"
                      name="basePrice"
                      value={price.basePrice === 0 ? "" : price.basePrice} // Handle empty string for 0
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex colored justify-between border-b text-center border-cyan-500 bg-bgBlue">
                  <div className="font-bold w-1/2 p-2">Airport Tax</div>
                  <div className="font-semibold w-1/2 border-cyan-500 border-l-2 p-2">
                    <input
                      type="number"
                      name="airportTax"
                      value={price.airportTax === 0 ? "" : price.airportTax} // Handle empty string for 0
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-between border-b text-center border-cyan-500">
                  <div className="font-bold w-1/2 p-2">Service Tax</div>
                  <div className="font-semibold w-1/2 border-cyan-500 border-l-2 p-2">
                    <input
                      type="number"
                      name="serviceTax"
                      value={price.serviceTax === 0 ? "" : price.serviceTax} // Handle empty string for 0
                      onChange={handlePriceChange}
                      className="w-full text-center bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex colored justify-between text-center bg-bgBlue">
                  <div className="font-bold w-1/2 p-2">Total Price</div>
                  <div className="font-semibold w-1/2 border-cyan-500 border-l-2 p-2">
                    <input
                      type="number"
                      name="totalPrice"
                      value={price.totalPrice === 0 ? "" : price.totalPrice} // Handle empty string for 0
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
      </div>
    </>
  );
};

export default OneWayTicket;