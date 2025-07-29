"use client";

import React, { useState, useEffect } from "react";

interface Customer {
  customer_id: number;
  full_name: string;
  phone: string;
  address?: string;
  created_at: string;
}

// نمونه داده ثابت برای تست (بعداً API می‌آید)
const sampleCustomers: Customer[] = [
  { customer_id: 1, full_name: "علی رضایی", phone: "0700123456", address: "تهران", created_at: "2025-07-28" },
  { customer_id: 2, full_name: "مریم احمدی", phone: "0700654321", address: "مشهد", created_at: "2025-07-20" },
];

export default function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // اینجا API بزودی می‌آید
    setCustomers(sampleCustomers);
  }, []);

  return (
    <div className="p-4 font-vazir">
      <h2 className="text-xl font-bold mb-4">لیست مشتریان</h2>
      <table className="w-full text-right border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-yellow-400">
            <th className="border border-gray-600 p-2">شناسه</th>
            <th className="border border-gray-600 p-2">نام کامل</th>
            <th className="border border-gray-600 p-2">شماره تلفن</th>
            <th className="border border-gray-600 p-2">آدرس</th>
            <th className="border border-gray-600 p-2">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customer_id} className="hover:bg-gray-700">
              <td className="border border-gray-600 p-2">{c.customer_id}</td>
              <td className="border border-gray-600 p-2">{c.full_name}</td>
              <td className="border border-gray-600 p-2">{c.phone}</td>
              <td className="border border-gray-600 p-2">{c.address ?? "-"}</td>
              <td className="border border-gray-600 p-2">{c.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
