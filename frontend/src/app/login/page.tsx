// frontend/src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="center-card card">
      <h1>خوش آمدید به GJBMS</h1>
      <p>برای ادامه وارد شوید یا ثبت نام کنید.</p>
      <div style={{display:'flex', gap:12, marginTop:16}}>
        <Link href="/login"><button className="btn">ورود</button></Link>
        <Link href="/register"><button className="btn btn-outline">ثبت نام</button></Link>
      </div>
    </div>
  );
}
