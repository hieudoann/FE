import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Khai báo biến navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://telemed.hoangphucthanh.vn/index.php/register', {
        reg_username: username,
        reg_password: password
      });

      if (response.data && response.data.message === "Đăng ký thành công") {
        setSuccess('Đăng ký thành công');
        setError(null);
      } else {
        setError('Đăng ký không thành công, vui lòng thử lại.');
        setSuccess(null);
      }
    } catch (error) {
      setError('Đăng ký thất bại, vui lòng thử lại.');
      setSuccess(null);
    }
  };

  // Hàm để điều hướng về trang đăng nhập
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h2>Đăng ký</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <div>
            <label>Tên đăng nhập:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng ký</button>
        </form>
        <span className="back-to-login" onClick={handleNavigateToLogin}>
          Quay lại trang đăng nhập
        </span>
      </div>
    </div>
  );
};

export default Register;
