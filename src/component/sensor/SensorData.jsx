import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SensorData.css';  // Import CSS

const SensorData = () => {
    const [data, setData] = useState({});

    const fetchSensorData = async () => {
        try {
            const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?latest');
            console.log('Sensor Data:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchSensorData();
        const intervalId = setInterval(fetchSensorData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="sensor-data-container">
            <h3>Latest Sensor Data</h3>
            <div className="sensor-data-grid">
                <div className="sensor-data-item">
                    <p className="label">Temperature</p>
                    <p className="value">{data.nhiet_do1 || 'N/A'}</p>
                    <p className="unit">°C</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Humidity</p>
                    <p className="value">{data.do_am1 || 'N/A'}</p>
                    <p className="unit">%</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Air Quality</p>
                    <p className="value">{data.air_quality || 'N/A'}</p>
                    <p className="unit">ppm</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">PM Fine dust</p>
                    <p className="value">{data.pm_fine_dust || 'N/A'}</p>
                    <p className="unit">µg/m³</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Longitude</p>
                    <p className="value">{data.lon || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Latitude</p>
                    <p className="value">{data.lat || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Light Toggle Count</p>
                    <p className="value">{data.lightToggleCount || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Operation Flag</p>
                    <p className="value">{data.opr_flag === 1 ? 'On' : 'Off'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Operation Time</p>
                    <p className="value">{data.opr_time || 'N/A'}</p>
                    {/* <p className="unit">h</p> */}
                </div>
                <div className="sensor-data-item">
                    <p className="label">Last Updated</p>
                    <p className="value">{data.created_at || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default SensorData;
