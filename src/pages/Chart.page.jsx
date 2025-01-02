// src/pages/FullDataPage.js
import React from 'react';
import Chart_data from '../component/chart/Chart.component';
// import './FullDataPage.css'; // Import CSS nếu cần

const Chart_data_sensor = () => {
    return (
        <div>
            {/* <h1>Full Sensor Data</h1> */}
            <Chart_data />
        </div>
    );
};

export default Chart_data_sensor;

