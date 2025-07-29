"use client";

import React from "react";

export default function LiveGoldPrice() {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md max-w-full font-vazir text-yellow-400">
      <h2 className="text-xl font-bold mb-4">نرخ آنلاین طلا</h2>
      <div className="w-full overflow-hidden rounded">
        <iframe 
          src="https://goldbroker.com/widget/historical/XAU?currency=USD" 
          width="100%" 
          height="400" 
          style={{ border: "none" }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
