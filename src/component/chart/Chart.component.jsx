// ...existing code...

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
  const [selectedDate, setSelectedDate] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?all_data');
      const apiData = response.data;

      if (!apiData || apiData.length === 0) {
        throw new Error('No data available');
      }

      // Filter by selected date if provided
      let filteredData = apiData;
      if (selectedDate) {
        const targetDate = parseISO(selectedDate);
        filteredData = apiData.filter(item => isSameDay(parseISO(item.created_at), targetDate));
      }

      if (filteredData.length === 0) {
        throw new Error('No data for the selected date');
      }

      // Sort by created_at in ascending order
      filteredData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      // Use hours (HH:00) as labels
      const hours = filteredData.map(item => format(new Date(item.created_at), 'HH:00'));

      // Create a single datasets array with your four fields
      const datasets = [
        {
          label: 'Temperature',
          data: filteredData.map(item => item.nhiet_do),
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
        },
        {
          label: 'Humidity',
          data: filteredData.map(item => item.do_am),
          backgroundColor: 'rgba(0, 0, 255, 0.8)',
        },
        {
          label: 'Air Quality',
          data: filteredData.map(item => item.cl_kk),
          backgroundColor: 'rgba(255, 165, 0, 0.8)',
        },
        {
          label: 'Fine Dust',
          data: filteredData.map(item => item.bui_min),
          backgroundColor: 'rgba(0, 128, 0, 0.8)',
        },
      ];

      setChartData({ labels: hours, datasets });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: selectedDate
          ? `Data on ${format(parseISO(selectedDate), 'dd/MM/yyyy')}`
          : 'Data for All Dates',
      },
    },
    scales: {
      x: { title: { display: true, text: 'Hour' } },
      y: { title: { display: true, text: 'Values' } },
    },
  };

  if (loading) return <p className="loading-chart">Loading...</p>;
  if (error) return <p className="error-chart">Error: {error}</p>;

  return (
    <div className="line-chart-container">
      <div className="filter-container">
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
// ...existing code...