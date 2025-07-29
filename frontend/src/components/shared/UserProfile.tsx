"use client";

import React from "react";

interface UserProfileProps {
  fullName: string;
  role: string;
  phone: string;
}

export default function UserProfile({ fullName, role, phone }: UserProfileProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md max-w-sm font-vazir text-yellow-400">
      <img
        src="/admin.jpg"
        alt="پروفایل ادمین"
        className="w-10 h-10 rounded-full border border-yellow-400"
      />
      <span className="font-vazir text-yellow-400">ادمین عزیز، خوش آمدید!</span>
      
      <h2 className="text-xl font-bold mb-3">پروفایل کاربر</h2>
      <p>نام: <span className="font-semibold">{fullName}</span></p>
      <p>نقش: <span className="font-semibold">{role}</span></p>
      <p>شماره تماس: <span className="font-semibold">{phone}</span></p>
    </div>
  );
}
