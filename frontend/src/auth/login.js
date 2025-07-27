// frontend/src/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });
      onLogin(response.data.access_token, response.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ backgroundColor: '#1a1a1a', color: '#FFD700', fontFamily: 'Vazir' }}>
        <h2 className="text-center mb-4">ورود به سیستم</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">نام کاربری</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">رمز عبور</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">ورود</button>
        </form>
      </div>
    </div>
  );
};

export default Login;