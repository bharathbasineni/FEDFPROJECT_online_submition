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
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Find user with matching credentials
    const existingUser = registeredUsers.find(
      (u: any) => u.email === email && u.password === password && u.role === role
    );
    
    if (!existingUser) {
      throw new Error('Invalid credentials or user not found. Please sign up first.');
    }
    
    const loggedInUser: User = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const signup = async (name: string, email: string, password: string, role: 'teacher' | 'student') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Get existing registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const userExists = registeredUsers.some((u: any) => u.email === email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role,
    };
    
    // Save to registered users
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Set current user (without password)
    const currentUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    
    setUser(currentUser);
    localStorage.setItem('user', JSON.stringify(currentUser));
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
