import "./index.css";
// import "./App.css";

import FileUpload from "./components/FileUpload";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OneWayTicket from "./components/OneWayTicket";
import TwoWayTicket from "./components/TwoWayTicket";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FileUpload />} />
          <Route exact path="/one-way" element={<OneWayTicket />} />
          <Route exact path="/two-way" element={<TwoWayTicket />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
