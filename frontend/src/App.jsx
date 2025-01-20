import { useState } from "react";
import "./index.css";
import FileUpload from "./components/FileUpload";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OneWayTicket from "./components/OneWayTicket";

function App() {
  return (
    <>
      <FileUpload />

      <Router>

        <Routes>
          <Route exact path="/one-way" element={<OneWayTicket />} />
  
        </Routes>
      </Router>
 
    </>
  );
}

export default App;
