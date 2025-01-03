import React from 'react';
import './Home.component.css'; // Ensure it's linked to the CSS file
import Emailjs from 'emailjs-com';

const Home = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        Emailjs.sendForm('service_0v9go2o', 'template_w43y2lk', e.target, 'Waf09zcqlehx4xfa6')
            .then((result) => {
                console.log(result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                alert('Failed to send message, please try again.');
            });

        e.target.reset();
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="logo-container">
                    <img src="logo2.png" alt="HOPT Logo" className="logo" /> {/* Add your logo image */}
                </div>
                <h1>𝑯𝑶𝑷𝑻 𝒄𝒂𝒓𝒆𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖 - 𝒚𝒐𝒖 𝒄𝒂𝒓𝒆 𝒇𝒐𝒓 𝒑𝒂𝒕𝒊𝒆𝒏𝒕𝒔!</h1>
                <nav>
                    <a href="https://hoangphucthanh.vn/" target="_blank" rel="noopener noreferrer" className="logo-link">HOPT</a>
                    <a href="#products">Products</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <h2>𝙒𝒆𝙡𝒄𝒐𝒎𝒆 𝙩𝒐 𝑯𝙊𝑨𝙉𝑮 𝑷𝙃𝑼𝘾 𝙏𝘼𝙉𝙃 𝘾𝑶.,𝙇𝙏</h2>
                <p>𝐘𝐎𝐔𝐑 𝐇𝐄𝐀𝐋𝐓𝐇 𝐎𝐍 𝐘𝐎𝐔𝐑 𝐇𝐀𝐍𝐃</p>
            </section>

            {/* Products Section */}
            <section id="products" className="products">
                {/* Left Product */}
                <div className="product-side">
                    <img src="telebox.png" alt="Product 1" />
                </div>
                
                {/* Center Product */}
                <div className="product-intro">
                    <img src="host.jpg" alt="Product Introduction" />
                </div>
                
                {/* Right Product */}
                <div className="product-side">
                    <img src="noisoibox.png" alt="Product 2" />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="feature-card">
                    <h3>HỆ THỐNG GIÁM SÁT SỨC KHỎE</h3>
                    <img src="gsht.png" alt="Hệ thống giám sát sức khỏe" />
                    <p>Hệ thống giám sát sức khỏe máy nội soi theo dõi liên tục các chỉ số quan trọng, phát hiện sớm sự cố và đảm bảo hiệu suất tối ưu. Điều này giúp giảm thời gian gián đoạn, tiết kiệm chi phí bảo trì và nâng cao độ chính xác trong chẩn đoán, bảo vệ sức khỏe bệnh nhân.</p>
                </div>
                <div className="feature-card">
                    <h3>Y TẾ TỪ XA</h3>
                    <img src="tele.png" alt="Y tế từ xa" />
                    <p>Y tế từ xa kết nối bệnh nhân với bác sĩ qua nền tảng trực tuyến, giúp nâng cao khả năng tiếp cận dịch vụ y tế. Công nghệ tiên tiến cho phép chẩn đoán và tư vấn từ xa, giảm chi phí và thời gian đi lại. Điều này đảm bảo chăm sóc liên tục, mang lại sự an tâm và tiết kiệm cho cộng đồng.</p>
                </div>
                <div className="feature-card">
                    <h3>HỖ TRỢ 24/7</h3>
                    <img src="sp247.jpg" alt="Hỗ trợ 24/7" />
                    <p>Chúng tôi cung cấp dịch vụ hỗ trợ 24/7, luôn sẵn sàng giải quyết mọi vấn đề kỹ thuật bất cứ lúc nào. Đội ngũ chuyên gia của chúng tôi thực hiện bảo trì và bảo dưỡng định kỳ, giúp thiết bị hoạt động ổn định và hiệu quả lâu dài. Với cam kết nhanh chóng và tận tâm, chúng tôi đảm bảo sự an tâm tuyệt đối cho khách hàng.</p>
                </div>
            </section>

            {/* Contact & Footer Section */}
            <div className="contact-footer">
                {/* Contact Section */}
                <section id="contact" className="contact" >
                    <h3>Contact Us</h3>
                    <form onSubmit={sendEmail}>
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <textarea name="message" placeholder="Your Message" required></textarea>
                        <button type="submit" className="cta-button">Send Message</button>
                    </form>
                </section>

                {/* Footer Section */}
                <div className="footer">
                    <div className="footer-info">
                        <p>Copyright &copy; 2024 CÔNG TY TNHH DV VÀ TM HOÀNG PHÚC THANH</p>
                        <p>Địa chỉ: Tầng 3, 607 Xô Viết Nghệ Tĩnh, Phường 26, Quận Bình Thạnh, TP.HCM</p>
                        <p>Điện thoại: 028 3785 3388 | 028 3785 1086</p>
                        <p>Email: <a href="mailto:info@hoangphucthanh.vn">info@hoangphucthanh.vn</a></p>
                        <p>Website: <a href="https://hoangphucthanh.vn" target="_blank" rel="noopener noreferrer">hoangphucthanh.vn</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;