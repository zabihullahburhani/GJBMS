// frontend/src/components/Customers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Customers = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ full_name: '', phone: '', address: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/customers', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCustomers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/customers', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCustomers();
      setForm({ full_name: '', phone: '', address: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت مشتریان</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">نام کامل</label>
          <input
            type="text"
            className="form-control"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">شماره تلفن</label>
          <input
            type="text"
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">آدرس</label>
          <textarea
            className="form-control"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">اضافه کردن مشتری</button>
      </form>
      <h3>لیست مشتریان</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام کامل</th>
            <th>تلفن</th>
            <th>آدرس</th>
            <th>تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{new Date(customer.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;