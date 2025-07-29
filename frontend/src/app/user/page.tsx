"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
// no SearchBar


export default function UserDashboard() {
   return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        
        <h1 className="text-3xl font-bold mb-4">داشبورد ادمین</h1>
        {/* بقیه کامپوننت‌ها */}
      </main>
      <Footer />
    </div>
  );
}
