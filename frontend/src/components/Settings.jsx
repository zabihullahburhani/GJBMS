import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Settings = ({ user }) => {
  const [goldTypes, setGoldTypes] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchGoldTypes();
  }, []);

  const fetchGoldTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/gold_types', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setGoldTypes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/gold_types', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchGoldTypes();
      setForm({ name: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>تنظیمات - مدیریت انواع طلا</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">نام نوع طلا</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">توضیحات</label>
          <textarea
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">اضافه کردن نوع طلا</button>
      </form>
      <h3>لیست انواع طلا</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {goldTypes.map((goldType) => (
            <tr key={goldType.gold_type_id}>
              <td>{goldType.gold_type_id}</td>
              <td>{goldType.name}</td>
              <td>{goldType.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;