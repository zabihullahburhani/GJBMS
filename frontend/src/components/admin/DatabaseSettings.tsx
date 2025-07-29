"use client";

import React from "react";

export default function DatabaseSettings() {
  // این لیست نمونه از جداول، بعداً از API گرفته می‌شود
  const tables = [
    "customers",
    "employees",
    "logins",
    "shop_expenses",
    "shop_balance",
    "gold_types",
    "gold_rates",
    "transactions"
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400 font-vazir">
      <h1 className="text-2xl font-bold mb-6">تنظیمات دیتابیس</h1>
      <p className="mb-4">لیست جداول دیتابیس برای ویرایش یا بررسی:</p>
      <ul className="space-y-2">
        {tables.map((table) => (
          <li
            key={table}
            className="bg-gray-800 px-3 py-2 rounded hover:bg-yellow-500 hover:text-gray-900 cursor-pointer"
          >
            {table}
          </li>
        ))}
      </ul>
    </div>
  );
}
