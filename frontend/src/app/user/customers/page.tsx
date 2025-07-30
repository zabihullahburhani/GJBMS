"use client";

import Customers from "@/components/user/Customers";

export default function UserCustomersPage() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">لیست مشتریان</h1>
      <Customers />
    </div>
  );
}
