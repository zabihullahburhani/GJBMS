"use client";


import React, { useState } from "react";

export default function GoldRateDifferences() {
  const [goldType, setGoldType] = useState("");
  const [previousRate, setPreviousRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [date, setDate] = useState("");
  const [differences, setDifferences] = useState<any[]>([]); // داده‌های تستی

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const diff = {
      goldType,
      previousRate,
      newRate,
      date,
    };
    setDifferences([...differences, diff]);
    // بعداً داده را به API می‌فرستی
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-2xl font-bold mb-4">تفاوت نرخ طلا</h1>

      {/* فرم ثبت تفاوت */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <div>
          <label className="block mb-1">نوع طلا (مثلاً 18K)</label>
          <input
            type="text"
            value={goldType}
            onChange={(e) => setGoldType(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">نرخ قبلی (فی‌گرم)</label>
          <input
            type="number"
            value={previousRate}
            onChange={(e) => setPreviousRate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">نرخ جدید (فی‌گرم)</label>
          <input
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">تاریخ</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
        >
          ثبت تفاوت
        </button>
      </form>

      {/* لیست تفاوت‌ها */}
      <h2 className="text-xl font-bold mb-3">لیست تفاوت نرخ‌های ثبت‌شده</h2>
      <ul className="space-y-2">
        {differences.map((item, index) => (
          <li key={index} className="bg-gray-800 p-3 rounded">
            <div>نوع طلا: {item.goldType}</div>
            <div>نرخ قبلی: {item.previousRate}</div>
            <div>نرخ جدید: {item.newRate}</div>
            <div>تاریخ: {new Date(item.date).toLocaleString("fa-IR")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
