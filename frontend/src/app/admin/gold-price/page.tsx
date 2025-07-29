"use client";

import LiveGoldPrice from "@/components/shared/LiveGoldPrice";

export default function GoldPricePage() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">نرخ آنلاین طلا</h1>
      <LiveGoldPrice />
    </div>
  );
}
