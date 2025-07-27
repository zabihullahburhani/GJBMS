import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Balance = ({ user }) => {
  const [balances, setBalances] = useState([]);
  const [form, setForm] = useState({ gold_balance_grams: '', cash_balance_usd: '' });

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/shop_balance', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBalances(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/shop_balance', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchBalances();
      setForm({ gold_balance_grams: '', cash_balance_usd: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت بیلانس دوکان</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">موجودی طلا (گرم)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.gold_balance_grams}
            onChange={(e) => setForm({ ...form, gold_balance_grams: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">موجودی نقدی (دلار)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.cash_balance_usd}
            onChange={(e) => setForm({ ...form, cash_balance_usd: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">به‌روزرسانی بیلانس</button>
      </form>
      <h3>تاریخچه بیلانس</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>موجودی طلا (گرم)</th>
            <th>موجودی نقدی (دلار)</th>
            <th>تاریخ به‌روزرسانی</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance) => (
            <tr key={balance.balance_id}>
              <td>{balance.balance_id}</td>
              <td>{balance.gold_balance_grams}</td>
              <td>{balance.cash_balance_usd}</td>
              <td>{new Date(balance.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Balance;