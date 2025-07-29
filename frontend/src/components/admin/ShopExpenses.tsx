"use client";

import React, { useState } from "react";

export default function ShopExpenses() {
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]); // داده تستی

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = { expenseType, amount, expenseDate, description, employeeId };
    setExpenses([...expenses, newExpense]);
    // بعداً به API هم می‌فرستی
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-2xl font-bold mb-4">ثبت مصارف دوکان</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <div>
          <label className="block mb-1">نوع مصرف</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">مبلغ (دلار)</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">تاریخ</label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">توضیحات</label>
          <textarea
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">شناسه کارمند ثبت‌کننده</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
        >
          ثبت
        </button>
      </form>

      <h2 className="text-xl font-bold mb-3">لیست مصارف ثبت‌شده</h2>
      <ul className="space-y-2">
        {expenses.map((exp, index) => (
          <li key={index} className="bg-gray-800 p-3 rounded">
            {exp.expenseType} - ${exp.amount} - {new Date(exp.expenseDate).toLocaleString("fa-IR")}
          </li>
        ))}
      </ul>
    </div>
  );
}
