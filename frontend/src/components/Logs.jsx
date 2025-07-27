// frontend/src/components/Logs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Logs = ({ user }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/logs', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLogs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>لاگ‌های سیستم</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>شناسه بلاک</th>
            <th>اقدام</th>
            <th>داده</th>
            <th>زمان</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.index}>
              <td>{log.index}</td>
              <td>{log.transactions[0]?.data.action}</td>
              <td>{JSON.stringify(log.transactions[0]?.data.data)}</td>
              <td>{new Date(log.timestamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;