import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Transactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [goldTypes, setGoldTypes] = useState([]);
  const [form, setForm] = useState({
    customer_id: '',
    employee_id: '',
    gold_type_id: '',
    grams: '',
    rate_per_gram: '',
    total_usd: '',
    notes: '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchCustomers();
    fetchEmployees();
    fetchGoldTypes();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/transactions', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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
      await axios.post('http://localhost:8000/users/transactions', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchTransactions();
      setForm({
        customer_id: '',
        employee_id: '',
        gold_type_id: '',
        grams: '',
        rate_per_gram: '',
        total_usd: '',
        notes: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>مدیریت معاملات</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">مشتری</label>
          <select
            className="form-control"
            value={form.customer_id}
            onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          >
            <option value="">انتخاب مشتری</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.full_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">کارمند</label>
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
        <div className="mb-3">
          <label className="form-label">نوع طلا</label>
          <select
            className="form-control"
            value={form.gold_type_id}
            onChange={(e) => setForm({ ...form, gold_type_id: e.target.value })}
          >
            <option value="">انتخاب نوع طلا</option>
            {goldTypes.map((goldType) => (
              <option key={goldType.gold_type_id} value={goldType.gold_type_id}>
                {goldType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">مقدار طلا (گرم)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.grams}
            onChange={(e) => setForm({ ...form, grams: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">نرخ هر گرم (دلار)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.rate_per_gram}
            onChange={(e) => setForm({ ...form, rate_per_gram: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">مبلغ کل (دلار)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={form.total_usd}
            onChange={(e) => setForm({ ...form, total_usd: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">یادداشت</label>
          <textarea
            className="form-control"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">ثبت معامله</button>
      </form>
      <h3>لیست معاملات</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>مشتری</th>
            <th>کارمند</th>
            <th>نوع طلا</th>
            <th>مقدار (گرم)</th>
            <th>نرخ (دلار)</th>
            <th>مبلغ کل (دلار)</th>
            <th>تاریخ</th>
            <th>یادداشت</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.txn_id}>
              <td>{txn.txn_id}</td>
              <td>{customers.find(c => c.customer_id === txn.customer_id)?.full_name}</td>
              <td>{employees.find(e => e.employee_id === txn.employee_id)?.full_name}</td>
              <td>{goldTypes.find(g => g.gold_type_id === txn.gold_type_id)?.name}</td>
              <td>{txn.grams}</td>
              <td>{txn.rate_per_gram}</td>
              <td>{txn.total_usd}</td>
              <td>{new Date(txn.txn_date).toLocaleString()}</td>
              <td>{txn.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;