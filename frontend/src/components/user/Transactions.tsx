"use client";

import React, { useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    {
      txn_id: 1,
      customer_name: "احمد",
      employee_name: "سلیم",
      gold_type: "24K",
      unit: "گرم",
      grams: 10,
      rate_per_gram: 2500,
      total_usd: 25000,
      total_afn: 1750000,
      txn_date: "2025-07-29",
      notes: "توضیح نمونه",
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: "",
    employeeName: "",
    goldType: "24K",
    unit: "گرم",
    grams: "",
    ratePerGram: "",
    totalUSD: "",
    totalAFN: "",
    balanceUSD: "",
    balanceAFN: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTxn = {
      txn_id: transactions.length + 1,
      customer_name: formData.customerName,
      employee_name: formData.employeeName,
      gold_type: formData.goldType,
      unit: formData.unit,
      grams: parseFloat(formData.grams),
      rate_per_gram: parseFloat(formData.ratePerGram),
      total_usd: parseFloat(formData.totalUSD),
      total_afn: parseFloat(formData.totalAFN),
      txn_date: new Date().toISOString().split("T")[0],
      notes: formData.notes,
    };
    setTransactions([newTxn, ...transactions]);
    setFormData({
      customerName: "",
      employeeName: "",
      goldType: "24K",
      unit: "گرم",
      grams: "",
      ratePerGram: "",
      totalUSD: "",
      totalAFN: "",
      balanceUSD: "",
      balanceAFN: "",
      notes: "",
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-yellow-400 font-vazir min-h-screen">
      <h1 className="text-2xl font-bold mb-4">مدیریت معاملات</h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-800 p-4 rounded border border-gray-600"
      >
        {/* مثال برای input */}
        <div>
          <label>نام مشتری</label>
          <input 
            name="customerName" 
            value={formData.customerName} 
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>نام کارمند</label>
          <input 
            name="employeeName" 
            value={formData.employeeName} 
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>عیار طلا</label>
          <select 
            name="goldType" 
            value={formData.goldType} 
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          >
            <option>24K</option>
            <option>21K</option>
            <option>18K</option>
          </select>
        </div>
        <div>
          <label>واحد (گرم/توله)</label>
          <select 
            name="unit" 
            value={formData.unit} 
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          >
            <option>گرم</option>
            <option>توله</option>
          </select>
        </div>
        <div>
          <label>مقدار طلا</label>
          <input 
            name="grams" 
            value={formData.grams} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>نرخ هر گرام (دالر)</label>
          <input 
            name="ratePerGram" 
            value={formData.ratePerGram} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>مجموع معامله (دالر)</label>
          <input 
            name="totalUSD" 
            value={formData.totalUSD} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>مجموع معامله (افغانی)</label>
          <input 
            name="totalAFN" 
            value={formData.totalAFN} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>بیلانس دالر</label>
          <input 
            name="balanceUSD" 
            value={formData.balanceUSD} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div>
          <label>بیلانس افغانی</label>
          <input 
            name="balanceAFN" 
            value={formData.balanceAFN} 
            onChange={handleChange}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          />
        </div>
        <div className="md:col-span-3">
          <label>توضیحات</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400 border border-gray-300"
          ></textarea>
        </div>
        <div className="md:col-span-3">
          <button 
            type="submit" 
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded mt-2"
          >
            ثبت معامله
          </button>
        </div>
      </form>

      {/* لیست معاملات */}
      <h2 className="text-xl font-bold mb-2">لیست معاملات</h2>
      <div className="overflow-auto">
        <table className="w-full text-right border border-yellow-400">
          <thead>
            <tr className="bg-yellow-400 text-gray-900">
              <th>شناسه</th>
              <th>مشتری</th>
              <th>کارمند</th>
              <th>عیار</th>
              <th>واحد</th>
              <th>مقدار</th>
              <th>نرخ</th>
              <th>مجموع $</th>
              <th>مجموع افغانی</th>
              <th>تاریخ</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.txn_id} className="border-t border-yellow-400">
                <td>{txn.txn_id}</td>
                <td>{txn.customer_name}</td>
                <td>{txn.employee_name}</td>
                <td>{txn.gold_type}</td>
                <td>{txn.unit}</td>
                <td>{txn.grams}</td>
                <td>{txn.rate_per_gram}</td>
                <td>{txn.total_usd}</td>
                <td>{txn.total_afn}</td>
                <td>{txn.txn_date}</td>
                <td>{txn.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
