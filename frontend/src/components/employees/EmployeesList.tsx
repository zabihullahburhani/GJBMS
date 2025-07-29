"use client";

import React, { useState } from "react";

interface Employee {
  employee_id: number;
  full_name: string;
  role: string;
  phone: string;
  created_at: string;
}

const sampleEmployees: Employee[] = [
  {
    employee_id: 1,
    full_name: "علی احمدی",
    role: "فروشنده",
    phone: "0700123456",
    created_at: "2025-07-25",
  },
  {
    employee_id: 2,
    full_name: "زهرا محمدی",
    role: "مدیر",
    phone: "0700654321",
    created_at: "2024-12-01",
  },
];

export default function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">لیست کارمندان</h2>
      <table className="w-full text-right border-collapse border border-yellow-400">
        <thead>
          <tr className="bg-yellow-400 text-gray-900">
            <th className="border border-yellow-400 p-2">شناسه</th>
            <th className="border border-yellow-400 p-2">نام کامل</th>
            <th className="border border-yellow-400 p-2">نقش</th>
            <th className="border border-yellow-400 p-2">شماره تماس</th>
            <th className="border border-yellow-400 p-2">تاریخ استخدام</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id} className="hover:bg-yellow-700">
              <td className="border border-yellow-400 p-2">{emp.employee_id}</td>
              <td className="border border-yellow-400 p-2">{emp.full_name}</td>
              <td className="border border-yellow-400 p-2">{emp.role}</td>
              <td className="border border-yellow-400 p-2">{emp.phone}</td>
              <td className="border border-yellow-400 p-2">{emp.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
