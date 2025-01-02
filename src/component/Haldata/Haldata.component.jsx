import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Haldata.component.css';
import RealtimeChart from './RealtimeChart'; // Import the chart component

const Haldata = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    powerData: [],
    currentData: [],
  });

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?latest');
      console.log('HalSensor', response.data);
      console.log('API Response:', response);

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([response.data]);
      }
      
      // Update chart data
      const currentTime = new Date().toLocaleTimeString();
      const currentValue1 = response.data.currentValue; // Assuming this is the current power value
      console.log(currentValue1)
      const currentAmperage = response.data.powerValue; // Assuming this is the current amperage value


      setChartData(prevData => ({
        labels: [...prevData.labels, currentTime],
        powerData: [...prevData.powerData, currentValue1], // Công suất
        currentData: [...prevData.currentData, currentAmperage], // Cường độ dòng điện
    }));
    

    } catch (error) {
      setError('Error fetching sensor data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="sensor-data-container-hal">
      <h3>Hall Data Sensor</h3>
      {data.length > 0 ? (
        <>
          <table className="sensor-data-table-hal">
            <thead>
              <tr>
                <th>Power-On Count</th>
                <th>XENON Operating Hours</th>
                <th>Current Amperage</th>
                <th>Power</th>
                <th>Realtime</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.lightToggleCount}</td>
                  <td>{item.opr_time}</td>
                  <td>{item.currentValue}</td>
                  <td>{item.powerValue}</td>
                  <td>{item.opr_flag}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <RealtimeChart
            labels={chartData.labels}
            powerData={chartData.powerData}
            currentData={chartData.currentData}
          />
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Haldata;
