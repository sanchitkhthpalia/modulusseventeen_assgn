import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as AuthApi from '../api/auth';
import { clearToken, getToken, setToken } from '../utils/storage';

type AuthState = {
  user: { id: string; email: string } | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState['user']>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      if (t) setTokenState(t);
      setIsLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await AuthApi.login(email, password);
    setUser(res.user);
    setTokenState(res.token);
    await setToken(res.token);
  };

  const register = async (email: string, password: string) => {
    const res = await AuthApi.register(email, password);
    setUser(res.user);
    setTokenState(res.token);
    await setToken(res.token);
  };

  const logout = async () => {
    setUser(null);
    setTokenState(null);
    await clearToken();
  };

  const value = useMemo(() => ({ user, token, isLoading, login, register, logout }), [user, token, isLoading]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


