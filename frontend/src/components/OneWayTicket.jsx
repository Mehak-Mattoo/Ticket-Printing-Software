import React from "react";
import header from "../../src/assets/header.png";

const OneWayTicket = () => {
  return (
    <>
      <div>
        <img src={header} alt="smh-agency" />
        <div className="mx-2">
          <h2 className="bg-[#c0f2fd]">Passenger Details</h2>
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>35</td>
                <td>Male</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>28</td>
                <td>Female</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OneWayTicket;
