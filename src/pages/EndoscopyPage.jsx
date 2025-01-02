// src/pages/EndoscopyPage.jsx
import React from 'react';
import './SolutionStyles.css'; // Tạo một file CSS chung nếu cần dùng chung phong cách

const EndoscopyPage = () => {
    return (
        <div className="solution-page">
            <h2>Hệ thống nội soi</h2>
            <p>
                Hệ thống nội soi tiên tiến giúp quản lý và lưu trữ dữ liệu bệnh nhân một cách hiệu quả, hỗ trợ các bác sĩ
                trong việc chẩn đoán và điều trị. Với chất lượng hình ảnh sắc nét và độ chính xác cao, hệ thống này là công cụ đắc lực cho các chuyên gia y tế.
            </p>
            <img src="/assets/endoscopy.jpg" alt="Hệ thống nội soi" className="solution-image" />
        </div>
    );
};

export default EndoscopyPage;
