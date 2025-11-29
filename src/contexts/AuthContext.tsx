import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'teacher' | 'student') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signup = async (name: string, email: string, password: string, role: 'teacher' | 'student') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
