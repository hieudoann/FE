import React from 'react';
import './PageStyles.css';
import { useNavigate } from 'react-router-dom';

const SolutionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <h2>Giải pháp</h2>
            <p>Khám phá các giải pháp của chúng tôi được thiết kế để cải thiện chăm sóc sức khỏe và nâng cao sự an lành cho bệnh nhân.</p>
            
            <div className="solutions-container">
                <div className="solution-card" onClick={() => navigate('/telemedicine')}>
                    <img src="/assets/telemedicine.jpg" alt="Telemedicine" className="solution-image"/>
                    <h3>Telemedicine</h3>
                    <p>Chúng tôi cung cấp giải pháp công nghệ y tế tiên tiến giúp theo dõi sức khỏe từ xa.</p>
                </div>
                <div className="solution-card" onClick={() => navigate('/endoscopy-system')}>
                    <img src="/assets/endoscopy.jpg" alt="Hệ thống nội soi" className="solution-image"/>
                    <h3>Hệ thống nội soi</h3>
                    <p>Giải pháp quản lý dữ liệu bệnh nhân giúp nâng cao hiệu quả trong công tác điều trị.</p>
                </div>
                <div className="solution-card" onClick={() => navigate('/or1-integrated-room')}>
                    <img src="/assets/or1.jpg" alt="Phòng mổ tích hợp OR1" className="solution-image"/>
                    <h3>Phòng mổ tích hợp OR1</h3>
                    <p>Hệ thống hỗ trợ quyết định lâm sàng dựa trên AI giúp bác sĩ đưa ra quyết định nhanh chóng và chính xác.</p>
                </div>
            </div>
        </div>
    );
};

export default SolutionPage;
