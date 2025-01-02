import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('https://iomt.hoangphucthanh.vn/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful') {
                    history.push('/home');
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Login</button>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </form>
    );
};

export default Login;