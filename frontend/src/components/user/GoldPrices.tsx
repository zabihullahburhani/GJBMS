"use client";
import React, { useEffect, useState } from "react";

export default function GoldPrices() {
  // استیت برای ذخیره قیمت‌ها
  const [goldPrices, setGoldPrices] = useState<{ type: string; price: number }[]>([]);

  // داده تستی - بعداً با API واقعی جایگزین می‌شود
  useEffect(() => {
    setGoldPrices([
      { type: "طلای 18 عیار", price: 50.25 },
      { type: "طلای 21 عیار", price: 60.75 },
      { type: "طلای 24 عیار", price: 70.00 },
    ]);
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md font-vazir text-yellow-400">
      <h2 className="text-xl font-bold mb-4">قیمت لحظه‌ای طلا</h2>
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="p-2">نوع طلا</th>
            <th className="p-2">قیمت هر گرم (دلار)</th>
          </tr>
        </thead>
        <tbody>
          {goldPrices.map((item, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-2">{item.type}</td>
              <td className="p-2">${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
