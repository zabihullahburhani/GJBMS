// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Employees from './components/Employees';
import Balance from './components/Balance';
import Transactions from './components/Transactions';
import Expenses from './components/Expenses';
import Settings from './components/Settings';
import Reports from './components/Reports';
import Licensing from './components/Licensing';
import APredictions from './components/APredictions';
import './static/css/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <Router>
      <div className="app" style={{ backgroundColor: '#1a1a1a', color: '#FFD700', fontFamily: 'Vazir' }}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
              <Route path="/customers" element={<Customers user={user} />} />
              {user.role === 'admin' && <Route path="/employees" element={<Employees user={user} />} />}
              <Route path="/balance" element={<Balance user={user} />} />
              <Route path="/transactions" element={<Transactions user={user} />} />
              <Route path="/expenses" element={<Expenses user={user} />} />
              {user.role === 'admin' && <Route path="/settings" element={<Settings user={user} />} />}
              {user.role === 'admin' && <Route path="/reports" element={<Reports user={user} />} />}
              <Route path="/licensing" element={<Licensing user={user} />} />
              <Route path="/ai-predictions" element={<APredictions user={user} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;