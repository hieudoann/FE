// src/pages/HomePage.js
import React from 'react';
import SensorData from '../component/sensor/SensorData';
// import './HomePage.css'; // Import CSS nếu cần

const LatestData = () => {
    return (
        <div>
            {/* <h1>Home Page</h1> */}
            <SensorData />
        </div>
    );
};

export default LatestData;
