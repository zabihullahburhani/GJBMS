"use client";

import React, { useState } from "react";

export default function Reports() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [format, setFormat] = useState<"pdf" | "excel">("pdf");

  const handleExport = () => {
    // 👇 اینجا بعداً کوئری به دیتابیس زده می‌شود برای فیلتر گزارش‌ها بر اساس بازه تاریخ
    // بعد داده‌ها به فرمت PDF یا Excel تبدیل می‌شود و دانلود می‌شود
    console.log("Exporting report from", startDate, "to", endDate, "as", format);
  };

  // داده تستی برای نمایش گزارش‌ها
  const reports = [
    { id: 1, title: "گزارش فروش خرداد", date: "1403/03/31" },
    { id: 2, title: "گزارش مصارف دوکان", date: "1403/04/10" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md font-vazir text-yellow-400 space-y-6">
      <h2 className="text-xl font-bold mb-3">گزارشات</h2>

      {/* انتخاب بازه تاریخ و فرمت */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label className="block mb-1">تاریخ شروع</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">تاریخ پایان</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">فرمت خروجی</label>
          <select
            value={format}
            onChange={e => setFormat(e.target.value as "pdf" | "excel")}
            className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleExport}
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
      >
        خروجی گرفتن از گزارش
      </button>

      {/* لیست گزارش‌ها */}
      <div className="space-y-2">
        {reports.map(r => (
          <div key={r.id} className="p-3 bg-gray-700 rounded">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-xs text-yellow-300">تاریخ: {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
