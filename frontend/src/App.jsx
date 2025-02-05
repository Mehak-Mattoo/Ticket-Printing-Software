import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import OneWayTicket from "./components/OneWayTicket";
import TwoWayTicket from "./components/TwoWayTicket";
import "./index.css";

// Create a new component to use `useLocation`
const AppContent = () => {
  const location = useLocation();
  const { extractedData, ticketType } = location.state || {};

  return (
    <Routes>
      <Route exact path="/" element={<FileUpload />} />
      <Route
        exact
        path="/one-way"
        element={
          <div>
            {extractedData && extractedData.length > 0 ? (
              extractedData.map((ticket, index) => (
                <OneWayTicket
                  key={index}
                  extractedData={ticket}
                  ticketType={ticketType}
                />
              ))
            ) : (
              <p>No tickets found.</p>
            )}
          </div>
        }
      />
      <Route
        exact
        path="/two-way"
        element={
          <div>
            {extractedData && extractedData.length > 0 ? (
              extractedData.map((ticket, index) => (
                <TwoWayTicket
                  key={index}
                  extractedData={ticket}
                  ticketType={ticketType}
                />
              ))
            ) : (
              <p>No tickets found.</p>
            )}
          </div>
        }
      />
    </Routes>
  );
};

// Wrap the AppContent inside a Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;