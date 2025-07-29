"use client";

import EmployeesList from "@/components/employees/EmployeesList";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function AdminEmployeesPage() {
  return (
    <div className="min-h-screen p-6 font-vazir bg-gray-900 text-yellow-400">
      <h1 className="text-2xl font-bold mb-4">مدیریت کارمندان</h1>
      <EmployeeForm />
      <EmployeesList />
    </div>
  );
}
