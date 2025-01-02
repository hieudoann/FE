import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://telemed.hoangphucthanh.vn/index.php/login', {
        login_username: username,  // Đúng tên trường theo API yêu cầu
        login_password: password   // Đúng tên trường theo API yêu cầu
      });

      if (response.data && response.data.message === "Đăng nhập thành công") {
        // Giả sử API trả về token khi đăng nhập thành công
        localStorage.setItem('authToken', response.data.token || 'dummy_token'); // Giả định có token
        navigate('/'); // Điều hướng tới trang Home sau khi đăng nhập thành công
      } else {
        setError('Đăng nhập không thành công, vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      setError('Đăng nhập thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Đăng nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
