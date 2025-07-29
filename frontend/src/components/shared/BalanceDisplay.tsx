"use client";

import React from "react";

interface BalanceDisplayProps {
  goldBalanceGrams: number;
  cashBalanceUSD: number;
  updatedAt: string;
}

export default function BalanceDisplay({ goldBalanceGrams, cashBalanceUSD, updatedAt }: BalanceDisplayProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md max-w-sm font-vazir text-yellow-400">
      <h2 className="text-xl font-bold mb-3">موجودی دوکان</h2>
      <p>موجودی طلا: <span className="font-semibold">{goldBalanceGrams.toFixed(2)} گرم</span></p>
      <p>موجودی نقدی: <span className="font-semibold">${cashBalanceUSD.toFixed(2)}</span></p>
      <p className="text-xs mt-3 text-yellow-300">آخرین بروزرسانی: {new Date(updatedAt).toLocaleString("fa-IR")}</p>
    </div>
  );
}
