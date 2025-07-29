"use client";

import React, { useState } from "react";

export default function AppActivation() {
  // داده‌های ساختگی برای تست؛ بعداً از API گرفته می‌شود
  const hardwareInfo = {
    macAddress: "00:1A:2B:3C:4D:5E",
    cpuId: "ABC123CPU456",
    motherboardSerial: "MB987654321",
  };

  const [activationCode, setActivationCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  // واتساپ برنامه‌نویس: شماره تلفن خودت را بگذار
  const developerPhone = "93712345678";

  // متن پیام برای واتساپ
  const whatsappMessage = encodeURIComponent(
    `سلام، لطفاً برای این اطلاعات کد فعال‌سازی بسازید:\n\nMAC: ${hardwareInfo.macAddress}\nCPU ID: ${hardwareInfo.cpuId}\nMotherboard: ${hardwareInfo.motherboardSerial}`
  );

  // لینک واتساپ
  const whatsappLink = `https://wa.me/${developerPhone}?text=${whatsappMessage}`;

  // تابع تستی برای فعال‌سازی؛ بعداً باید با بک‌اند چک شود
  const handleActivate = () => {
    if (activationCode === "123456") {
      setIsActivated(true);
      alert("✅ برنامه فعال شد!");
    } else {
      alert("❌ کد فعال‌سازی نامعتبر است.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400 font-vazir">
      <h1 className="text-2xl font-bold mb-4">فعال‌سازی برنامه</h1>

      <div className="space-y-2 mb-6">
        <p>✅ <span className="font-semibold">MAC Address:</span> {hardwareInfo.macAddress}</p>
        <p>✅ <span className="font-semibold">CPU ID:</span> {hardwareInfo.cpuId}</p>
        <p>✅ <span className="font-semibold">Motherboard Serial:</span> {hardwareInfo.motherboardSerial}</p>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-400 mb-4"
      >
        ارسال اطلاعات به واتساپ برنامه‌نویس
      </a>

      <div className="mb-4">
        <label className="block mb-1">کد فعال‌سازی دریافتی:</label>
        <input
          type="text"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
        />
      </div>

      <button
        onClick={handleActivate}
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
      >
        تأیید فعال‌سازی
      </button>

      {isActivated && (
        <p className="mt-4 text-green-400 font-semibold">✅ برنامه با موفقیت فعال شد!</p>
      )}
    </div>
  );
}
