// frontend/src/components/LoginForm.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiLogin } from '../services/api';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin'|'user'>('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await apiLogin({ username, password, role });
      // data should contain access_token and role info
      localStorage.setItem('gjbms_token', data.access_token);
      localStorage.setItem('gjbms_role', data.role ?? role);
      if ((data.role ?? role) === 'admin') router.push('/admin');
      else router.push('/user');
    } catch (err: any) {
      setError(err?.message ?? 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <label>نقش</label>
      <select value={role} onChange={(e)=> setRole(e.target.value as any)} className="input">
        <option value="admin">ادمین</option>
        <option value="user">یوزر</option>
      </select>

      <label>نام کاربری</label>
      <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />

      <label>رمز عبور</label>
      <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />

      {error && <div className="error">{error}</div>}

      <div style={{display:'flex', gap:12, marginTop:12}}>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'در حال ورود...' : 'ورود'}</button>
        <button type="button" className="btn btn-outline" onClick={()=>{setUsername('');setPassword('');}}>پاک کردن</button>
      </div>
    </form>
  );
}
