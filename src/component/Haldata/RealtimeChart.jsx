import React from 'react';
import { Bar } from 'react-chartjs-2'; // Thay Line thành Bar để tạo biểu đồ dạng cột
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RealtimeChart = ({ labels, powerData, currentData }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current (A)',
                data: powerData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền cho cột Power
                borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cho cột Power
                borderWidth: 1,
            },
            {
                label: 'Power (W)',
                data: currentData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Màu nền cho cột Current
                borderColor: 'rgba(255, 99, 132, 1)', // Màu viền cho cột Current
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Realtime Power and Current Bar Chart',
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Đảm bảo trục X bắt đầu từ 0
            },
            y: {
                beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0, không có vùng âm
            },
        },
    };

    return <Bar options={options} data={data} />;
};

export default RealtimeChart;
