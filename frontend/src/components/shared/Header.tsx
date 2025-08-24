// frontend/src/components/shared/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">GJBMS</div>
        <nav>
          <Link href="/"><a>خانه</a></Link>
          <Link href="/login"><a>ورود</a></Link>
          <Link href="/register"><a>ثبت نام</a></Link>
        </nav>
      </div>
    </header>
  );
}
