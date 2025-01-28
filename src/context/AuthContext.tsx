import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { onAuthStateChange } from '../services/auth';
import { initializeUserPreferences } from '../services/preferences';

interface User {
  email: string;
  provider?: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial auth check
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    setLoading(false);

    // Set up auth state change listener
    const unsubscribe = onAuthStateChange((userData) => {
      setUser(userData);
      if (userData) {
        initializeUserPreferences().catch(console.error);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}