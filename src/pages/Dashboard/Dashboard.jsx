import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Dashboard.css';
import GaugeChart from 'react-gauge-chart';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the subLocation ID from URL parameters

  const { subLocation } = location.state || {};
  
  if (!subLocation) {
    return <p className="no-data">No sub-location data available.</p>;
  }

  const handleSubLocationClick = () => {
    navigate('/map');
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">{subLocation.name} Dashboard</h2>
      <div className="gauge-container">
        <div className="gauge-card" onClick={handleSubLocationClick}>
          <GaugeChart
            id="temp1-gauge"
            nrOfLevels={30}
            percent={subLocation.nhiet_do1 / 100}
            textColor="#000"
            formatTextValue={() => `${subLocation.nhiet_do1}°C`}
          />
          <p className="gauge-title">Temperature 1</p>
        </div>
        <div className="gauge-card" onClick={handleSubLocationClick}>
          <GaugeChart
            id="hum1-gauge"
            nrOfLevels={30}
            percent={subLocation.do_am1 / 100}
            textColor="#000"
            formatTextValue={() => `${subLocation.do_am1}%`}
          />
          <p className="gauge-title">Humidity 1</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
