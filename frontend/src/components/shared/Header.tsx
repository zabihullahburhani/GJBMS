"use client";
import Image from "next/image";
import React from "react";
import Notifications from "@/components/shared/Notifications";

const dummyNotifications = [
  { id: 1, message: "معامله جدید ثبت شد", date: "2025-07-28T12:00:00", read: false },
  { id: 2, message: "موجودی طلا به‌روزرسانی شد", date: "2025-07-27T08:30:00", read: true },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-yellow-400 font-vazir">
      
      {/* سمت راست: پروفایل و خوش آمدید */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <Image 
          src="/admin.jpg" // عکس پروفایل در public
          alt="پروفایل ادمین"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-yellow-400 text-base font-semibold">خوش آمدید، ادمین</span>
      </div>

      {/* وسط: لوگو */}
      <div className="flex justify-center flex-1">
        <Image 
          src="/logo.png" 
          alt="لوگوی پروژه"
          width={300}
          height={200}
        />
      </div>

      {/* سمت چپ: نوتیفیکیشن‌ها */}
      <div className="flex items-center">
        <Notifications notifications={dummyNotifications} />
      </div>
    </header>
  );
}
