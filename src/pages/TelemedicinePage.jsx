// src/pages/TelemedicinePage.jsx
import React from 'react';
import './SolutionStyles.css'; // Sử dụng chung stylesheet với OR1Page nếu cần

const TelemedicinePage = () => {
    return (
        <div className="solution-page">
            <h2>Giải pháp Telemedicine</h2>
            <p>
                Telemedicine cho phép theo dõi và chăm sóc sức khỏe từ xa thông qua các công nghệ hiện đại, giúp bệnh nhân dễ dàng tiếp cận
                dịch vụ y tế mọi lúc, mọi nơi. Với hệ thống bảo mật và khả năng kết nối cao, telemedicine cải thiện trải nghiệm chăm sóc sức khỏe cho người dùng.
            </p>
            <img src="/assets/telemedicine.jpg" alt="Giải pháp Telemedicine" className="solution-image" />
        </div>
    );
};

export default TelemedicinePage;
