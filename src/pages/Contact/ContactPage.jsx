import React from 'react';
import './ContactPage.css'; // Tạo một file CSS mới để tinh chỉnh giao diện

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Cảm ơn bạn đã liên hệ với chúng tôi!");
    };

    return (
        <div className="contact-page-container">
            <h2>Liên hệ với chúng tôi</h2>
            <p className="intro-text">
                Chúng tôi rất vui lòng nhận thông tin phản hồi từ bạn. Hãy liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất.
            </p>

            <div className="contact-section">
                <div className="contact-info">
                    <h3>Thông tin liên lạc</h3>
                    <p>Địa chỉ: Tầng 3, 607 Xô Viết Nghệ Tĩnh, Phường 26,  Quận Bình Thạnh, Thành phố Hồ Chí Minh </p>
                    <p>Số điện thoại: (028) 3785 3388</p>
                    <p>Email: info@hoangphucthanh.vn</p>
                </div>
                <div className="contact-form">
                    <h3>Gửi tin nhắn</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Tên của bạn:</label>
                            <input type="text" id="name" placeholder="Nhập tên của bạn" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Nhập email của bạn" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Tin nhắn:</label>
                            <textarea id="message" placeholder="Viết tin nhắn của bạn" rows="4" required></textarea>
                        </div>
                        <button type="submit" className="submit-button">Gửi tin nhắn</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
