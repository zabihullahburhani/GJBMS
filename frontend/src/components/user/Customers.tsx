"use client";

import React, { useState } from "react";

interface Customer {
  customer_id: number;
  full_name: string;
  phone: string;
  address?: string;
  created_at: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  // هندلر تغییر ورودی‌ها
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // هندلر ارسال فرم
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      alert("نام کامل و تلفن الزامی است");
      return;
    }
    const newCustomer: Customer = {
      customer_id: Date.now(), // موقتاً شناسه با timestamp
      full_name: form.full_name,
      phone: form.phone,
      address: form.address,
      created_at: new Date().toISOString(),
    };
    setCustomers([newCustomer, ...customers]);
    setForm({ full_name: "", phone: "", address: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-vazir text-yellow-400 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-6 font-bold">مدیریت مشتریان</h1>

      {/* فرم ثبت مشتری */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-4 font-semibold">افزودن مشتری جدید</h2>
        <div className="mb-4">
          <label htmlFor="full_name" className="block mb-1">
            نام کامل <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-yellow-300 focus:outline-yellow-500"
            placeholder="مثلاً: محمد احمدی"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">
            شماره تلفن <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-yellow-300 focus:outline-yellow-500"
            placeholder="مثلاً: 0700123456"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">
            آدرس
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-yellow-300 focus:outline-yellow-500"
            placeholder="آدرس مشتری (اختیاری)"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded transition-colors"
        >
          ثبت مشتری
        </button>
      </form>

      {/* لیست مشتریان */}
      <section>
        <h2 className="text-xl mb-4 font-semibold">لیست مشتریان</h2>
        {customers.length === 0 ? (
          <p className="text-yellow-300">هیچ مشتری‌ای ثبت نشده است.</p>
        ) : (
          <table className="w-full text-right table-auto border-collapse border border-yellow-400 rounded">
            <thead>
              <tr className="bg-yellow-400 text-gray-900">
                <th className="border border-yellow-500 px-3 py-2">شناسه</th>
                <th className="border border-yellow-500 px-3 py-2">نام کامل</th>
                <th className="border border-yellow-500 px-3 py-2">شماره تلفن</th>
                <th className="border border-yellow-500 px-3 py-2">آدرس</th>
                <th className="border border-yellow-500 px-3 py-2">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.customer_id} className="even:bg-gray-800 odd:bg-gray-700">
                  <td className="border border-yellow-500 px-3 py-2">{c.customer_id}</td>
                  <td className="border border-yellow-500 px-3 py-2">{c.full_name}</td>
                  <td className="border border-yellow-500 px-3 py-2">{c.phone}</td>
                  <td className="border border-yellow-500 px-3 py-2">{c.address || "-"}</td>
                  <td className="border border-yellow-500 px-3 py-2">
                    {new Date(c.created_at).toLocaleString("fa-IR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
