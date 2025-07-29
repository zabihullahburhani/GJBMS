/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"], // این پیش‌فرض فونت وزیر می‌شود
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl')
  ],
};
