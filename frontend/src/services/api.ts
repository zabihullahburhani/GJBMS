// frontend/src/services/api.ts
export type EmployeeCreate = { full_name: string; role: string; phone?: string; };
export type LoginCreate = { employee_id: number; username: string; password: string; };

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'خطای سرور');
  }
  return res.json();
}

export async function apiLogin(payload: { username: string; password: string; role: string; }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleRes(res);
}

export async function apiCreateEmployee(payload: EmployeeCreate) {
  const res = await fetch(`${API_BASE}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleRes(res);
}

export async function apiCreateLogin(payload: LoginCreate) {
  const res = await fetch(`${API_BASE}/logins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleRes(res);
}

export default {
  apiLogin,
  apiCreateEmployee,
  apiCreateLogin
};
