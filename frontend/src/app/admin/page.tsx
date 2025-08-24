"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";
import UserProfile from "@/components/shared/UserProfile";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/shared/SearchBar";
import LiveGoldPrice from "@/components/shared/LiveGoldPrice";  
import Transactions from "@/components/admin/Transactions";
import Reports from "@/components/admin/Reports";   
import GoldRateDifferences from "@/components/admin/GoldRateDifferences"; 
import ShopExpenses from "@/components/admin/ShopExpenses";
import AppActivation from "@/components/admin/AppActivation";
import Settings from "@/components/admin/Settings";
import DatabaseSettings from "@/components/admin/DatabaseSettings";
import Logout from "@/components/shared/Logout";
import Image from "next/image";


export default function AdminDashboard() {
    const userData = {
    fullName: "ذبیح الله برهانی",
    role: "ادمین",
    phone: "0705002913",
  };


  return (

    
      
      
    

    <div className="flex flex-col min-h-screen font-vazir bg-gray-900 text-yellow-400">
        <Image src="/logo.png" alt="لوگوی پروژه" width={350} height={230} className="mb-4 rounded-full" />


      {/* هدر */}
      <Header /> 
      

      {/* بخش اصلی: سایدبار و محتوا */}
      <div className="flex flex-1">
        {/* سایدبار راست */}
        <nav className="w-56 bg-gray-800 p-4 flex flex-col space-y-4 rtl:text-right">
          <h2 className="text-lg font-bold mb-4">منو ادمین</h2>
          <Link href="/admin/customers" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
            مشتریان
          </Link>
          <Link href="/admin/employees" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
            کارمندان
          </Link>
          <Link href="/admin/balance" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
            بیلانس
          </Link>
            <Link href="/admin/gold-price" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
                نرخ آنلاین طلا
            </Link>
            <Link href="/admin/transactions" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded"> 
                معاملات
            </Link>
            <Link href="/admin/reports" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">

                گزارشات
            </Link>
            <Link href="/admin/gold-rate-differences" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
                تفاوت نرخ طلا   
            </Link>
            <Link href="/admin/shop-expenses" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
                مصارف دوکان     
            </Link>
            <Link href="/admin/app-activation" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
                فعال‌سازی برنامه
            </Link>
            <Link href="/admin/settings" className="hover:bg-yellow-400 hover:text-gray-900 px-3 py-2 rounded">
                تنظیمات
            </Link>
            <Logout /> 






           
        </nav>

        {/* محتوا */}
        <main className="flex-grow p-6">

          <UserProfile
          fullName={userData.fullName}
          role={userData.role}
          phone={userData.phone}
        />
            
            {/* کامپوننت جستجو */}
          <SearchBar />
          <h1 className="text-3xl font-bold mb-6">خوش آمدید به داشبورد ادمین</h1>
          <p>لطفاً از منوی سمت راست یکی از بخش‌ها را انتخاب کنید.</p>
        </main>
      </div>
      
      {/* فوتر */}
      <Footer />
    </div>
  );
}

