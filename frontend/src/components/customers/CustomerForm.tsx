"use client";

import React, { useState } from "react";

export default function CustomerForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`ثبت مشتری: ${fullName}, تلفن: ${phone}, آدرس: ${address}`);
    // اینجا API ثبت اطلاعات فراخوانی می‌شود
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 font-vazir max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">ثبت مشتری جدید</h2>
      <input
        type="text"
        placeholder="نام کامل"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full p-2 border border-yellow-400 rounded bg-gray-900 text-yellow-400"
      />
      <input
        type="tel"
        placeholder="شماره تلفن"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full p-2 border border-yellow-400 rounded bg-gray-900 text-yellow-400"
      />
      <textarea
        placeholder="آدرس (اختیاری)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 border border-yellow-400 rounded bg-gray-900 text-yellow-400"
      />
      <button
        type="submit"
        className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-500 transition"
      >
        ثبت مشتری
      </button>
    </form>
  );
}
