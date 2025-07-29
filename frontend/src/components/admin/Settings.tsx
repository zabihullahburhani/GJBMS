"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Settings() {
  const [language, setLanguage] = useState("fa");
  const [theme, setTheme] = useState("dark");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("✅ تنظیمات با موفقیت ذخیره شد!");
    // در اینجا بعداً درخواست به API فرستاده می‌شود
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400 font-vazir">
      <h1 className="text-2xl font-bold mb-6">تنظیمات برنامه</h1>

      <div className="mb-4">
        <label className="block mb-1">انتخاب زبان:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
        >
          <option value="fa">فارسی</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">تغییر تم:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
        >
          <option value="dark">تیره</option>
          <option value="light">روشن</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">تغییر رمز عبور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور جدید"
          className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-400"
        />
      </div>

      {/* سایر تنظیمات بعداً در اینجا اضافه می‌شود */}

      <button
        onClick={handleSave}
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
      >
        ذخیره تغییرات
      </button>

      // ...

<Link
  href="/admin/settings/database"
  className="block mt-6 text-yellow-300 hover:text-yellow-500 underline"
>
  تنظیمات دیتابیس (مشاهده و تغییر جداول)
</Link>

    </div>
  );
}

