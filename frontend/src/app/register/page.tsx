// frontend/src/app/register/page.tsx
'use client';
import RegisterForm from '../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="center-card">
      <h2>ثبت کارمند و ساخت حساب</h2>
      <RegisterForm />
    </div>
  );
}
