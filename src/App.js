import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Import main pages
import Home from "./pages/Home.page.jsx";
import LatestData from "./pages/LatestData.jsx";
import Haldata from "./pages/HalData.page.jsx";
import Chart from "./pages/Chart.page.jsx";
import HoptPage from "./pages/HoptPage.jsx";
import SolutionPage from "./pages/SolutionPage.jsx";
import RDPage from "./pages/RDPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import MapPage from "./pages/MapPage.jsx";

// Import components
import ChatBot from "./component/ChatBot/ChatBot.component.jsx";
import ToggleButton from "./component/Button/ToggleButton.jsx";
import TemperatureMonitor from "./component/TemperatureMonitor/TemperatureMonitor.jsx";

// Import solution pages
import TelemedicinePage from "./pages/TelemedicinePage.jsx";
import EndoscopyPage from "./pages/EndoscopyPage.jsx";
import OR1Page from "./pages/OR1Page.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

const App = () => {
  return (
    <>
  
    <div className="app-container">
      <TemperatureMonitor />
      <ToggleButton />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<LatestData />} />
        <Route path="/hal-data" element={<Haldata />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/hopt" element={<HoptPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/rd" element={<RDPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/map" element={<MapPage />} />
        {/* Update the route for Dashboard */}
        <Route path="/map/dashboard/:id" element={<Dashboard />} />
        {/* Define solution pages routes */}
        <Route path="/telemedicine" element={<TelemedicinePage />} />
        <Route path="/endoscopy-system" element={<EndoscopyPage />} />
        <Route path="/or1-integrated-room" element={<OR1Page />} />
      </Routes>

      {/* Add ChatBot */}
    </div>
      <ChatBot />
    </>
  );
};

export default App;
