import React from "react";
import header from "../../src/assets/header.png";

const OneWayTicket = () => {
  return (
    <>
      <div>
        <img src={header} alt="smh-agency" />
        <div className="my-2">
          {/* 1st table */}
          <div className="m-3">
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
                      The Sliding Mr. Bones (Next Stop, Pottersville)
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">
                      Malcolm Lockyer
                    </td>
                    <td className="border border-cyan-500 px-4 py-2">1961</td>
                    <td className="border border-cyan-500 px-4 py-2">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2nd table */}
          <div className="m-3">
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

          {/* 3rd table- 1st part */}
          <div className="m-3">
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
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
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
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                    <td className="font-bold border border-cyan-500 px-4 py-2">
                      {" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 table */}

          <div className="m-3">
            <h2 className="bg-skyBlue ">PRICE DETAILS</h2>

            <div className="border border-cyan-500 border-3 max-w-md my-3">
              {/* Table Rows */}
              <div className="flex justify-between border-b border-cyan-500 ">
                <div className="font-semibold text-left w-1/2  ">
                  Base Price
                </div>
                <div className="font-bold text-right w-1/2  border-cyan-500  border-l-2">
                  --
                </div>
              </div>
              <div className="flex justify-between border-b border-cyan-500  bg-bgBlue">
                <div className="font-semibold text-left w-1/2">Airport Tax</div>
                <div className="font-bold text-right w-1/2  border-cyan-500  border-l-2">
                  --
                </div>
              </div>
              <div className="flex justify-between border-b border-cyan-500 ">
                <div className="font-semibold text-left w-1/2">Service Tax</div>
                <div className="font-bold text-right w-1/2  border-cyan-500  border-l-2">
                  --
                </div>
              </div>
              <div className="flex justify-between  bg-bgBlue">
                <div className="font-semibold text-left w-1/2">Total Price</div>
                <div className="font-bold text-right w-1/2  border-cyan-500  border-l-2">
                  --
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
