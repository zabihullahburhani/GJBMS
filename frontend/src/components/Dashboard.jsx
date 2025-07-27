import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">داشبورد سیستم مدیریت جواهرفروشی</h2>
      <div className="card p-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }}>
        <h3>خوش آمدید، {user.role === 'admin' ? 'ادمین' : 'کاربر'}</h3>
        <div className="row">
          <div className="col-md-4 mb-3">
            <Link to="/customers" className="btn btn-primary w-100">مدیریت مشتریان</Link>
          </div>
          {user.role === 'admin' && (
            <div className="col-md-4 mb-3">
              <Link to="/employees" className="btn btn-primary w-100">مدیریت کارمندان</Link>
            </div>
          )}
          <div className="col-md-4 mb-3">
            <Link to="/balance" className="btn btn-primary w-100">بیلانس دوکان</Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/transactions" className="btn btn-primary w-100">معاملات</Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/expenses" className="btn btn-primary w-100">مصارف دوکان</Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/ai-predictions" className="btn btn-primary w-100">پیش‌بینی AI</Link>
          </div>
          {user.role === 'admin' && (
            <>
              <div className="col-md-4 mb-3">
                <Link to="/settings" className="btn btn-primary w-100">تنظیمات</Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link to="/reports" className="btn btn-primary w-100">گزارش‌ها</Link>
              </div>
            </>
          )}
          <div className="col-md-4 mb-3">
            <Link to="/licensing" className="btn btn-primary w-100">لایسنس</Link>
          </div>
        </div>
        <button onClick={onLogout} className="btn btn-danger mt-4">خروج</button>
      </div>
    </div>
  );
};

export default Dashboard;