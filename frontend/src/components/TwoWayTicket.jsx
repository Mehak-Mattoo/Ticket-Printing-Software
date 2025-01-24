import React, { useState, useEffect } from "react";
import header from "../../src/assets/header.png";
import logo from "../../src/assets/agencylogo.png";
import "../App.css";
import { useLocation } from "react-router-dom";
import PrimaryBtn from "../helper/PrimaryBtn";

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
        name: extractedData.name || "",
        passportNum: extractedData.passportNumber || "",
        DOB: extractedData.dob || "",
        status: extractedData.status || "",
      }));

      // Update flight state
      setFlight((prevState) => ({
        ...prevState,
        airline: extractedData.airlineName || "",
        flightNum: extractedData.flightNumber || "",
        cabin: extractedData.cabin || "",
        stop: extractedData.stops || "",
        airlinePNR: extractedData.pnr || "",
        eTicketNum: extractedData.eTicket || "",
        origin:
          extractedData.originAirport +
            ", " +
            extractedData.originCityCountry || "",
        destination:
          extractedData.destinationAirport +
            ", " +
            extractedData.destinationCityCountry || "",
        date: extractedData.date || "",
        time: extractedData.time || "",
        baggage: extractedData.baggage || "",
        departureTerminal: extractedData.originAirport || "",
      }));

      // Update price state
      setPrice((prevState) => ({
        ...prevState,
        basePrice: extractedData.basePrice || 0,
        airportTax: extractedData.airportTax || 0,
        serviceTax: extractedData.serviceTax || 0,
        totalPrice: extractedData.totalPrice || 0,
      }));
    }
  }, [extractedData]);

  return (
    <>
      <div>
        <PrimaryBtn
          bgColor="bg-aquamarine"
          onClick={() => {
            window.print();
          }}
        >
          {" "}
          download
        </PrimaryBtn>
        <img src={header} className="w-full h-24" alt="smh-agency" />
        <div className="">
          <img className="w-1/6 ml-5" src={logo} alt="smh-agency" />

          {/* 1st table */}
          <div className="mx-3 text-sm ">
            <h2 className="bg-skyBlue">PASSENGER DETAILS</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3  w-full">
                <thead className="">
                  <tr className="">
                    <th className="border border-cyan-500 border-3 px-4 py-2">
                      Passenger's name
                    </th>
                    <th className="border  border-cyan-500 border-3 px-4 py-2">
                      Passport No.
                    </th>
                    <th className="border  border-cyan-500 border-3 px-4 py-2">
                      Date of Birth
                    </th>
                    <th className="border border-cyan-500 border-3 px-4 py-2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className=" bg-[#cef1f9] text-center align-middle ">
                  <tr className=" ">
                    <td className="border border-cyan-500 px-4 py-2">
                      {passenger.name}
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">
                      {passenger.passportNum}
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">
                      {passenger.DOB}
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">
                      {passenger.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2nd table */}
          <div className="mx-3 text-sm ">
            <h2 className="bg-skyBlue">AGENT DETAILS</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-2 my-3 border-cyan-500 border-3  w-full">
                <thead>
                  <tr className="border">
                    <th className=" border border-cyan-500 px-4 py-2 ">
                      Agent's Details
                    </th>
                    <th className=" border border-cyan-500 px-4 py-2 ">
                      Support No.
                    </th>
                    <th className=" border border-cyan-500 px-4 py-2 ">
                      Phone No.
                    </th>
                    <th className=" border border-cyan-500 px-4 py-2 ">
                      E-mail
                    </th>
                  </tr>
                </thead>
                <tbody className=" bg-[#cef1f9] text-center align-middle border border-borderBlue">
                  <tr className=" ">
                    <td className="font-bold border border-cyan-500 px-4 py-2 ">
                      SMH Travel Agency
                    </td>

                    <td className="border border-cyan-500 px-4 py-2">
                      +989370291702
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">
                      +91904544484
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      @smhtravelagency@gmail.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="img-bg">
            {/* 3rd table- 1st part */}
            <div className="mx-3 text-sm ">
              <h2 className="bg-skyBlue ">FLIGHT DETAILS</h2>
              <div className="overflow-x-auto flex">
                <img src="" alt="logo" />
                <table className="table-auto border-2 my-3 border-cyan-500 border-3  w-full">
                  <thead>
                    <tr className="border">
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Airline
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Flight No./Aircraft Type
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Cabin
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Stop
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Airline PNR
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        E-Ticket Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-[#cef1f9] text-center align-middle border border-borderBlue">
                    <tr className="">
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.airline}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.flightNum}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.cabin}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.stop}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.airlinePNR}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.eTicketNum}
                      </td>
                    </tr>
                  </tbody>

                  {/* 3rd table- 2nd part */}

                  <thead>
                    <tr className="border">
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Origin
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Destination
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Date
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Time
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Baggage
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Departure Terminal
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-bgBlue text-center align-middle border border-borderBlue">
                    <tr className="">
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.origin}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.destination}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.date}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.time}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.baggage}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.departureTerminal}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mx-3 text-sm ">
              {/* 3rd table- 3rd part */}

              <div className="overflow-x-auto flex">
                <img src="" alt="logo" />
                <table className="table-auto border-2 my-3 border-cyan-500 border-3  w-full">
                  <thead>
                    <tr className="border">
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Airline
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Flight No./Aircraft Type
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Cabin
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Stop
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Airline PNR
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        E-Ticket Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-[#cef1f9] text-center align-middle border border-borderBlue">
                    <tr className="">
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.airline}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.flightNum}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.cabin}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.stop}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.airlinePNR}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.eTicketNum}
                      </td>
                    </tr>
                  </tbody>

                  {/* 3rd table- 4th part */}

                  <thead>
                    <tr className="border">
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Origin
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Destination
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Date
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Time
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Baggage
                      </th>
                      <th className="font-bold border border-cyan-500 px-4 py-2">
                        Departure Terminal
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-bgBlue text-center align-middle border border-borderBlue">
                    <tr className="">
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.origin}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.destination}
                      </td>
                      <td className="border border-cyan-500 px-4 py-2">
                        {flight.date}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.time}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.baggage}
                      </td>
                      <td className=" border border-cyan-500 px-4 py-2">
                        {flight.departureTerminal}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4 table */}

            <div className="mx-3 text-sm ">
              <h2 className="bg-skyBlue ">PRICE DETAILS</h2>

              <div className="border border-cyan-500 border-3 max-w-md my-3">
                <div className="flex justify-between border-b text-center border-cyan-500 ">
                  <div className="font-semibold  w-1/2  ">Base Price</div>
                  <div className="font-bold  w-1/2  border-cyan-500  border-l-2">
                    --
                  </div>
                </div>
                <div className="flex justify-between border-b text-center border-cyan-500  bg-bgBlue">
                  <div className="font-semibold w-1/2">Airport Tax</div>
                  <div className="font-bold w-1/2  border-cyan-500  border-l-2">
                    --
                  </div>
                </div>
                <div className="flex justify-between border-b text-center border-cyan-500 ">
                  <div className="font-semibold w-1/2">Service Tax</div>
                  <div className="font-bold w-1/2  border-cyan-500  border-l-2">
                    --
                  </div>
                </div>
                <div className="flex justify-between text-center bg-bgBlue">
                  <div className="font-semibold  w-1/2">Total Price</div>
                  <div className="font-bold w-1/2  border-cyan-500  border-l-2">
                    --
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
