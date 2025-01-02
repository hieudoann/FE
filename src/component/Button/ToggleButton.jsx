import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaChartLine, FaDatabase } from 'react-icons/fa'; // Sử dụng biểu tượng
import './ToggleButton.css'; // Liên kết với CSS

const ToggleButton = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false); // Kiểm tra vị trí cuộn

    // Kiểm tra vị trí cuộn để áp dụng hiệu ứng
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true); // Khi cuộn xuống 50px
        } else {
            setIsScrolled(false); // Khi quay lại đầu trang
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); // Thêm sự kiện cuộn
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []);

    const handleGoToHome = () => navigate('/');
    const handleGoToMap = () => navigate('/map');
    const handleGoToLatest = () => navigate('/latest');
    const handleHaldata = () => navigate('/hal-data');
    const handleButton = () => navigate('/chart');

    return (
        <div className={`toggle-button-container ${isScrolled ? 'scrolled' : ''}`}>
            <button onClick={handleGoToHome} className="toggle-button">
                <FaHome className="icon" /> Home
            </button>
            <button onClick={handleGoToMap} className="toggle-button">
                <FaMapMarkerAlt className="icon" /> Map
            </button>
            <button onClick={handleGoToLatest} className="toggle-button">
                <FaDatabase className="icon" /> Latest Data
            </button>
            <button onClick={handleHaldata} className="toggle-button">
                <FaDatabase className="icon" /> Hall Data Sensor
            </button>
            <button onClick={handleButton} className="toggle-button">
                <FaChartLine className="icon" /> Chart
            </button>
        </div>
    );
};

export default ToggleButton;
