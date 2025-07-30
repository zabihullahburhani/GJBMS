"use client";

import Transactions from "@/components/user/Transactions";

export default function TransactionsPage() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">صفحه معاملات</h1>
      <Transactions />
    </div>
  );
}
