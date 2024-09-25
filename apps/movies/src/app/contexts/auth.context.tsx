import React, { useEffect, useState } from 'react';
import { API_URL } from '../core/api-url';

export const AuthContext = React.createContext<{
  user: { email: string } | null;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
}>({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setIsLoading(false);
    setUser(data);
  };

  const logout = async () => {
    await fetch(`${API_URL}/login/${user!.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
