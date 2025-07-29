"use client";

import BalanceDisplay from "@/components/shared/BalanceDisplay";

export default function BalancePage() {
  const balanceData = {
    goldBalanceGrams: 125.5,
    cashBalanceUSD: 4500,
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen font-vazir text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">صفحه بیلانس دوکان</h1>
      <BalanceDisplay
        goldBalanceGrams={balanceData.goldBalanceGrams}
        cashBalanceUSD={balanceData.cashBalanceUSD}
        updatedAt={balanceData.updatedAt}
      />
    </div>
  );
}
