import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import GaugeChart from 'react-gauge-chart';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve subLocation data from navigation state
  const { subLocation } = location.state || {};

  if (!subLocation) {
    return <p className="no-data">No sub-location data available.</p>;
  }

  const handleBackClick = () => {
    navigate('/map');
  };

  return (
    <div className="dashboard">
      <button className="back-button" onClick={handleBackClick}>Back to Map</button>
      <h2 className="dashboard-title">{subLocation.name} Dashboard</h2>
      <div className="gauge-container">
        {/* Temperature */}
        <div className="gauge-card">
          <GaugeChart
            id="temp-gauge"
            nrOfLevels={30}
            percent={subLocation.nhiet_do / 100} // Assuming temperature range is 0-100°C
            textColor="#000"
            formatTextValue={() => `${subLocation.nhiet_do}°C`}
          />
          <p className="gauge-title">Temperature</p>
        </div>

        {/* Humidity */}
        <div className="gauge-card">
          <GaugeChart
            id="hum-gauge"
            nrOfLevels={30}
            percent={subLocation.do_am / 100} // Assuming humidity range is 0-100%
            textColor="#000"
            formatTextValue={() => `${subLocation.do_am}%`}
          />
          <p className="gauge-title">Humidity</p>
        </div>

        {/* Air Quality */}
        <div className="gauge-card">
          <GaugeChart
            id="aq-gauge"
            nrOfLevels={30}
            percent={subLocation.cl_kk / 500} // Assuming air quality index range up to 500
            textColor="#000"
            formatTextValue={() => `${subLocation.cl_kk}`}
          />
          <p className="gauge-title">Air Quality</p>
        </div>

        {/* Fine Dust */}
        <div className="gauge-card">
          <GaugeChart
            id="dust-gauge"
            nrOfLevels={30}
            percent={subLocation.bui_min / 200} // Assuming fine dust range up to 200 µg/m³
            textColor="#000"
            formatTextValue={() => `${subLocation.bui_min} µg/m³`}
          />
          <p className="gauge-title">Fine Dust</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;