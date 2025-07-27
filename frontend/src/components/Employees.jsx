import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Employees = ({ user }) => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ full_name: '', role: '', phone: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/employees', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/employees', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchEmployees();
      setForm({ full_name: '', role: '', phone: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت کارمندان</h2>
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
          <label className="form-label">نقش</label>
          <select
            className="form-control"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">انتخاب نقش</option>
            <option value="admin">ادمین</option>
            <option value="seller">فروشنده</option>
            <option value="accountant">حسابدار</option>
            <option value="manager">مدیر</option>
          </select>
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
        <button type="submit" className="btn btn-primary">اضافه کردن کارمند</button>
      </form>
      <h3>لیست کارمندان</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام کامل</th>
            <th>نقش</th>
            <th>تلفن</th>
            <th>تاریخ استخدام</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.role}</td>
              <td>{employee.phone}</td>
              <td>{new Date(employee.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;