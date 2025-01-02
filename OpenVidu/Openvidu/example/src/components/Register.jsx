import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('https://iomt.hoangphucthanh.vn/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Registration successful') {
                    alert('Registration successful');
                    history.push('/login');
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
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
            <button type="submit">Register</button>
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </form>
    );
};

export default Register;