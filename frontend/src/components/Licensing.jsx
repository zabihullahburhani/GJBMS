import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Licensing = ({ user }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/licensing', { license_key: licenseKey }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setResult({ message: 'خطا در فعال‌سازی لایسنس' });
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت لایسنس</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">کلید لایسنس</label>
          <input
            type="text"
            className="form-control"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">فعال‌سازی لایسنس</button>
      </form>
      {result && (
        <div className="card p-4">
          <h3>نتیجه</h3>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default Licensing;