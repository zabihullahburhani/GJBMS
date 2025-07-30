"use client";

import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import Footer from "@/components/shared/Footer";
import UserSidebar from "@/components/user/Sidebar";
import GoldPrices from "@/components/user/GoldPrices";


export default function UserDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-yellow-400 font-vazir">
      <Header />
      <SearchBar />
      
      <div className="flex flex-1">
        <UserSidebar />
        
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">خوش آمدید به داشبورد کاربر</h1>
          {/* اینجا محتوای اصلی داشبورد کاربر نمایش داده می‌شود */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
