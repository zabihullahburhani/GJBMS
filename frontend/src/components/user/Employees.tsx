"use client";
import React, { useState } from "react";

export default function Employees() {
  // استیت برای لیست کارمندان
  const [employees, setEmployees] = useState([
    { id: 1, full_name: "احمد احمدی", role: "فروشنده", phone: "0700000000" },
    { id: 2, full_name: "سمیرا رضایی", role: "مدیر", phone: "0700000001" },
  ]);

  // استیت برای ورودی‌های فورم
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  // هندل ثبت کارمند جدید
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !role || !phone) return; // چک ساده برای خالی نبودن

    const newEmployee = {
      id: employees.length + 1, // ساده: بعداً می‌توان از uuid یا id از سرور گرفت
      full_name: fullName,
      role,
      phone,
    };

    setEmployees([...employees, newEmployee]);

    // پاک کردن فورم
    setFullName("");
    setRole("");
    setPhone("");
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md font-vazir text-yellow-400">
      <h2 className="text-xl font-bold mb-4">کارمندان</h2>
      
      {/* فورم افزودن کارمند */}
      <form className="space-y-3 mb-6" onSubmit={handleAddEmployee}>
        <div>
          <label className="block mb-1">نام کامل</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">نقش</label>
          <input
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <button type="submit" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded">
          ثبت
        </button>
      </form>

      {/* لیست کارمندان */}
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="p-2">شناسه</th>
            <th className="p-2">نام کامل</th>
            <th className="p-2">نقش</th>
            <th className="p-2">شماره تماس</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-b border-gray-700">
              <td className="p-2">{emp.id}</td>
              <td className="p-2">{emp.full_name}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2">{emp.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
