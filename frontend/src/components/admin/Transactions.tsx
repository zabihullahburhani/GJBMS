"use client";

import React, { useState } from "react";

interface Transaction {
  txn_id: number;
  customer_id: number;
  employee_id: number;
  gold_type_id: number;
  grams: number;
  rate_per_gram: number;
  total_usd: number;
  txn_date: string;
  notes?: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // داده تستی برای FKها
  const customers = [{ id: 1, name: "علی حسینی" }, { id: 2, name: "مریم اکبری" }];
  const employees = [{ id: 1, name: "محمد رسولی" }, { id: 2, name: "سارا امیری" }];
  const goldTypes = [{ id: 1, name: "18k" }, { id: 2, name: "21k" }, { id: 3, name: "24k" }];

  const [form, setForm] = useState({
    customer_id: 1,
    employee_id: 1,
    gold_type_id: 1,
    grams: 0,
    rate_per_gram: 0,
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "grams" || name === "rate_per_gram" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTxn: Transaction = {
      txn_id: transactions.length + 1,
      customer_id: Number(form.customer_id),
      employee_id: Number(form.employee_id),
      gold_type_id: Number(form.gold_type_id),
      grams: Number(form.grams),
      rate_per_gram: Number(form.rate_per_gram),
      total_usd: Number(form.grams) * Number(form.rate_per_gram),
      txn_date: new Date().toISOString(),
      notes: form.notes
    };
    setTransactions([...transactions, newTxn]);
    setForm({ customer_id: 1, employee_id: 1, gold_type_id: 1, grams: 0, rate_per_gram: 0, notes: "" });
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md font-vazir text-yellow-400 space-y-6">
      <h2 className="text-xl font-bold mb-3">ثبت معامله جدید</h2>

      {/* فرم ثبت معامله */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1">مشتری</label>
            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
            >
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1">کارمند ثبت‌کننده</label>
            <select
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
            >
              {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1">نوع طلا</label>
            <select
              name="gold_type_id"
              value={form.gold_type_id}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
            >
              {goldTypes.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1">مقدار طلا (گرم)</label>
            <input
              name="grams"
              type="number"
              value={form.grams}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1">نرخ هر گرم</label>
            <input
              name="rate_per_gram"
              type="number"
              value={form.rate_per_gram}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-yellow-400 w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">توضیحات</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>

        <button type="submit" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400">
          ثبت معامله
        </button>
      </form>

      {/* جدول لیست معاملات */}
      <h2 className="text-xl font-bold mt-6">لیست معاملات</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-yellow-500 text-gray-900">
              <th className="p-2">#</th>
              <th className="p-2">مشتری</th>
              <th className="p-2">کارمند</th>
              <th className="p-2">نوع طلا</th>
              <th className="p-2">وزن</th>
              <th className="p-2">نرخ</th>
              <th className="p-2">جمع کل</th>
              <th className="p-2">تاریخ</th>
              <th className="p-2">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.txn_id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-2">{txn.txn_id}</td>
                <td className="p-2">{customers.find(c => c.id === txn.customer_id)?.name || "-"}</td>
                <td className="p-2">{employees.find(e => e.id === txn.employee_id)?.name || "-"}</td>
                <td className="p-2">{goldTypes.find(g => g.id === txn.gold_type_id)?.name || "-"}</td>
                <td className="p-2">{txn.grams}</td>
                <td className="p-2">${txn.rate_per_gram.toFixed(2)}</td>
                <td className="p-2">${txn.total_usd.toFixed(2)}</td>
                <td className="p-2">{new Date(txn.txn_date).toLocaleDateString("fa-IR")}</td>
                <td className="p-2">{txn.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
