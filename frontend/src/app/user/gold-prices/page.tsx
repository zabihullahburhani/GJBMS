
"use client";

import GoldPrices from "@/components/user/GoldPrices";

export default function GoldPricesPage() {
  return (
    <main className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">قیمت لحظه‌ای طلا</h1>
      <GoldPrices />
    </main>
  );
}
