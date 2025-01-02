// src/pages/OR1Page.jsx
import React from 'react';
import './SolutionStyles.css'; // Tạo và thêm các kiểu CSS nếu cần

const OR1Page = () => {
    return (
        <div className="solution-page">
            <h2>Phòng mổ tích hợp OR1</h2>
            <p>
                Giải pháp OR1 tích hợp hệ thống phòng mổ, hỗ trợ bác sĩ trong quá trình phẫu thuật với các công nghệ tiên tiến
                như AI, video HD và quản lý dữ liệu bệnh nhân. Hệ thống được thiết kế để tối ưu hóa hiệu quả làm việc trong phòng mổ và đảm bảo an toàn cho bệnh nhân.
            </p>
            <img src="/assets/or1.jpg" alt="Phòng mổ tích hợp OR1" className="solution-image" />
        </div>
    );
};

export default OR1Page;
