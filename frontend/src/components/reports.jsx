import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Reports = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const txnResponse = await axios.get('http://localhost:8000/users/transactions', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTransactions(txnResponse.data);

      const expResponse = await axios.get('http://localhost:8000/users/shop_expenses', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses(expResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>گزارش‌ها</h2>
      <div className="card p-4 mb-4">
        <h3>گزارش معاملات</h3>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>مشتری</th>
              <th>مقدار (گرم)</th>
              <th>مبلغ کل (دلار)</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.txn_id}>
                <td>{txn.txn_id}</td>
                <td>{txn.customer_id}</td>
                <td>{txn.grams}</td>
                <td>{txn.total_usd}</td>
                <td>{new Date(txn.txn_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-4">
        <h3>گزارش مصارف</h3>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نوع مصرف</th>
              <th>مبلغ (دلار)</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.expense_id}>
                <td>{expense.expense_id}</td>
                <td>{expense.expense_type}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.expense_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;