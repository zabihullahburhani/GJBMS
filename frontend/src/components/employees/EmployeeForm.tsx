"use client";

import React, { useState } from "react";

export default function EmployeeForm() {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`کارمند جدید ثبت شد:\nنام: ${fullName}\nنقش: ${role}\nشماره تماس: ${phone}`);
    // بعداً اینجا کد ارسال به سرور یا مدیریت state اضافه می‌شود
    setFullName("");
    setRole("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-md">
      <h2 className="text-xl font-bold mb-3">ثبت کارمند جدید</h2>

      <label className="block mb-2" htmlFor="fullName">نام کامل:</label>
      <input
        id="fullName"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full p-2 rounded border border-yellow-400 bg-gray-800 text-yellow-400"
      />

      <label className="block mb-2 mt-4" htmlFor="role">نقش:</label>
      <input
        id="role"
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="w-full p-2 rounded border border-yellow-400 bg-gray-800 text-yellow-400"
      />

      <label className="block mb-2 mt-4" htmlFor="phone">شماره تماس:</label>
      <input
        id="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full p-2 rounded border border-yellow-400 bg-gray-800 text-yellow-400"
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300"
      >
        ثبت
      </button>
    </form>
  );
}
