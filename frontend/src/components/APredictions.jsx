import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const APredictions = ({ user }) => {
  const [form, setForm] = useState({ gold_type: '', historical_data: '' });
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/ai_predictions', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPrediction(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>پیش‌بینی AI</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">نوع طلا</label>
          <select
            className="form-control"
            value={form.gold_type}
            onChange={(e) => setForm({ ...form, gold_type: e.target.value })}
          >
            <option value="">انتخاب نوع طلا</option>
            <option value="18k">18k</option>
            <option value="21k">21k</option>
            <option value="24k">24k</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">داده‌های تاریخی (JSON)</label>
          <textarea
            className="form-control"
            value={form.historical_data}
            onChange={(e) => setForm({ ...form, historical_data: e.target.value })}
            placeholder='مثال: {"dates": ["2023-01-01"], "prices": [1000]}'
          />
        </div>
        <button type="submit" className="btn btn-primary">دریافت پیش‌بینی</button>
      </form>
      {prediction && (
        <div className="card p-4">
          <h3>نتیجه پیش‌بینی</h3>
          <p>{JSON.stringify(prediction)}</p>
        </div>
      )}
    </div>
  );
};

export default APredictions;