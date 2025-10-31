import { api } from './client';

export interface AuthResponse {
  token: string;
  user: { id: string; email: string };
}

export async function register(email: string, password: string) {
  const res = await api.post<AuthResponse>('/auth/register', { email, password });
  return res.data;
}

export async function login(email: string, password: string) {
  const res = await api.post<AuthResponse>('/auth/login', { email, password });
  return res.data;
}


