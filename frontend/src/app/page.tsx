"use client";


import React, { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("user"); // مقدار پیش‌فرض یوزر
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-vazir">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css');
      `}</style>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-right text-yellow-400">
        <h1 className="text-3xl font-bold mb-6 text-center">ورود به سیستم GJBMS </h1>

        <label className="block mb-2">
          نقش:
          <select
            className="w-full mt-1 p-2 rounded-md bg-gray-700 text-yellow-400 border border-yellow-400 focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">ادمین</option>
            <option value="user">کاربر عادی</option>
          </select>
        </label>

        <label className="block mb-4">
          نام کاربری:
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-md bg-gray-700 text-yellow-400 border border-yellow-400 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری خود را وارد کنید"
          />
        </label>

        <label className="block mb-4">
          رمز عبور:
          <input
            type="password"
            className="w-full mt-1 p-2 rounded-md bg-gray-700 text-yellow-400 border border-yellow-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور خود را وارد کنید"
          />
        </label>

        <label className="flex items-center mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="form-checkbox h-5 w-5 text-yellow-400 bg-gray-700 border-yellow-400"
          />
          <span className="mr-2 select-none">مرا بخاطر بسپار</span>
        </label>

        <button className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-xl shadow hover:bg-yellow-500 transition">
          ورود
        </button>

        <p className="text-gray-400 mt-6 text-center text-sm select-none">
          © ۲۰۲۵ GJBMS. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  );
}
