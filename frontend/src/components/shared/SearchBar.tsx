"use client";

import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`در حال جستجو برای: ${query}`);
    // اینجا بعداً می‌توانی تابع جستجوی واقعی را فراخوانی کنی
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="جستجو..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 rounded-l-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-vazir"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-md font-bold hover:bg-yellow-500 transition"
      >
        جستجو
      </button>
    </form>
  );
}
