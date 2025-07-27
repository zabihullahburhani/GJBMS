import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Expenses = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ expense_type: '', amount: '', description: '', employee_id: '' });

  useEffect(() => {
    fetchExpenses();
    fetchEmployees();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/shop_expenses', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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
      await axios.post('http://localhost:8000/users/shop_expenses', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchExpenses();
      setForm({ expense_type: '', amount: '', description: '', employee_id: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت مصارف دوکان</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">نوع مصرف</label>
          <select
            className="form-control"
            value={form.expense_type}
            onChange={(e) => setForm({ ...form, expense_type: e.target.value })}
          >
            <option value="">انتخاب نوع مصرف</option>
            <option value="rent">کرایه</option>
            <option value="electricity">برق</option>
            <option value="tax">مالیات</option>
            <option value="other">سایر</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">مبلغ (دلار)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
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
        <div className="mb-3">
          <label className="form-label">کارمند ثبت‌کننده</label>
          <select
            className="form-control"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          >
            <option value="">انتخاب کارمند</option>
            {employees.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">ثبت مصرف</button>
      </form>
      <h3>لیست مصارف</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نوع مصرف</th>
            <th>مبلغ (دلار)</th>
            <th>توضیحات</th>
            <th>کارمند</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.expense_id}>
              <td>{expense.expense_id}</td>
              <td>{expense.expense_type}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{employees.find(e => e.employee_id === expense.employee_id)?.full_name}</td>
              <td>{new Date(expense.expense_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;