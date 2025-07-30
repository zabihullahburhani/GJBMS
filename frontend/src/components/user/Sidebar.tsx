"use client";

import Link from "next/link";



export default function UserSidebar() {
  return (
    <div className="w-60 bg-gray-800 text-yellow-400 p-4 min-h-screen font-vazir">
      <h2 className="text-xl font-bold mb-6">پنل کاربر</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/user" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">داشبورد</Link>
        </li>
        <li>
          <Link href="/user/customers" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">مشتریان</Link>
        </li>
        <li>
          <Link href="/user/employees" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">کارمندان</Link>
        </li>
        <li>
          <Link href="/user/gold-prices" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">قیمت طلا</Link>
        </li>
        <li>
          <Link href="/user/transactions" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">معاملات</Link>
        </li>
        <li>
          <Link href="/user/gold-rate-differences" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">تفاوت نرخ طلا</Link>
        </li>
        <li>
          <Link href="/user/shop-expenses" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">مصارفات دوکان</Link>
        </li>
        <li>
          <Link href="/user/profile" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">پروفایل</Link>
        </li>
        <li>
          <Link href="/user/logout" className="block hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">خروج</Link>
        </li>
      </ul>
    </div>
  );
}
