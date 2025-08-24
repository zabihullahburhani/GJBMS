// frontend/src/app/layout.tsx
import './globals.css';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'GJBMS System',
  description: 'Gold & Shop Management System'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa">
      <body className="font-custom bg-app">
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
