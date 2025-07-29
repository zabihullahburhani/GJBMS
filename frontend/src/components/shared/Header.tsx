"use client";

import React from "react";
import Notifications from "@/components/shared/Notifications";

const dummyNotifications = [
  { id: 1, message: "معامله جدید ثبت شد", date: "2025-07-28T12:00:00", read: false },
  { id: 2, message: "موجودی طلا به‌روزرسانی شد", date: "2025-07-27T08:30:00", read: true },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-yellow-400">
      <div className="flex items-center space-x-2">
        <img
          src="/admin.jpg"
          alt="پروفایل"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg font-semibold text-yellow-400">خوش آمدید، ادمین</span>
      </div>
      {/* نوتیفیکیشن */}
      <Notifications notifications={dummyNotifications} />
    </header>
  );
}
