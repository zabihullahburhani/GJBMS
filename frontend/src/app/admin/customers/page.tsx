"use client";

import CustomersList from "@/components/customers/CustomersList";
import CustomerForm from "@/components/customers/CustomerForm";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function AdminCustomersPage() {
  return (
    <div className="min-h-screen p-6 font-vazir bg-gray-900 text-yellow-400">
      <Header />
      <main className="flex-grow p-6 space-y-10">
        <h1 className="text-2xl font-vazir font-bold mb-4">مدیریت مشتریان</h1>
        <CustomerForm />
        <CustomersList />
      </main>
      <Footer />
    </div>
  );
}
