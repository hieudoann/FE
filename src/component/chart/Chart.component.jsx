import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, parseISO, isSameDay } from 'date-fns';
import './Chart.component.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartWithFilter = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Temperature 1 - Humidity 1');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?all_data');
      const apiData = response.data;

      if (!apiData || apiData.length === 0) {
        throw new Error("No data available");
      }

      let filteredData = apiData;

      if (selectedDate) {
        const targetDate = parseISO(selectedDate);
        filteredData = apiData.filter(item => isSameDay(parseISO(item.created_at), targetDate));
      }

      if (filteredData.length === 0) {
        throw new Error("No data for the selected date");
      }

      // Sort the filtered data by created_at in ascending order
      filteredData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      const hours = filteredData.map(item => format(new Date(item.created_at), 'HH:00'));

      const dataMap = {
        'Temperature 1 - Humidity 1': {
          datasets: [
            {
              label: 'Temperature 1',
              data: filteredData.map(item => item.nhiet_do1),
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
            },
            {
              label: 'Humidity 1',
              data: filteredData.map(item => item.do_am1),
              backgroundColor: 'rgba(0, 0, 255, 0.8)',
            },
          ]
        },
        'Temperature 2 - Humidity 2': {
          datasets: [ 
            {
              label: 'Temperature 2',
              data: filteredData.map(item => item.nhiet_do2),
              backgroundColor: 'rgba(255, 165, 0, 0.8)',
            },
            {
              label: 'Humidity 2',
              data: filteredData.map(item => item.do_am2),
              backgroundColor: 'rgba(0, 128, 0, 0.8)',
            },
          ]
        },
        'Temperature 3 - Humidity 3': {
          datasets: [
            {
              label: 'Temperature 3',
              data: filteredData.map(item => item.nhiet_do3),
              backgroundColor: 'rgba(128, 0, 128, 0.8)',
            },
            {
              label: 'Humidity 3',
              data: filteredData.map(item => item.do_am3),
              backgroundColor: 'rgba(255, 140, 0, 0.8)',
            },
          ]
        }
      };

      setChartData({ labels: hours, ...dataMap[filter] });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [filter, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Data for ${filter}${selectedDate ? ` on ${format(parseISO(selectedDate), 'dd/MM/yyyy')}` : ''}`,
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Hour' },
      },
      y: {
        title: { display: true, text: 'Values' },
      },
    },
  };

  if (loading) return <p className="loading-chart">Loading...</p>;
  if (error) return <p className="error-chart">Error: {error}</p>;

  return (
    <div className="line-chart-container">
      <div className="filter-container">
        <button className="filter-button" onClick={() => setShowDropdown(!showDropdown)}>
          Filter
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => { setFilter('Temperature 1 - Humidity 1'); setShowDropdown(false); }}>
              Temp/Hu 1
            </div>
            <div className="dropdown-item" onClick={() => { setFilter('Temperature 2 - Humidity 2'); setShowDropdown(false); }}>
              Temp/Hu 2
            </div>
            <div className="dropdown-item" onClick={() => { setFilter('Temperature 3 - Humidity 3'); setShowDropdown(false); }}>
              Temp/Hu 3
            </div>
          </div>
        )}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-picker"
        />
      </div>
      <div className="chart-container">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default BarChartWithFilter;