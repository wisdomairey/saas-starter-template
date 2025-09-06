'use client';

import React, { createContext, useContext, useState } from 'react';
import { User as CustomUser } from '@/types';

// Mock Firebase User type for portfolio demo
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  getIdToken: () => Promise<string>;
}

interface AuthContextType {
  user: MockUser | null;
  customUser: CustomUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock user data for portfolio demo
  const mockUser: MockUser = {
    uid: 'demo-user-123',
    email: 'demo@flowlaunch.com',
    displayName: 'Demo User',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    getIdToken: async () => 'mock-token'
  };

  const mockCustomUser: CustomUser = {
    uid: 'demo-user-123',
    email: 'demo@flowlaunch.com',
    displayName: 'Demo User',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    stripeCustomerId: 'cus_demo123',
    subscription: {
      id: 'sub_demo123',
      status: 'active',
      priceId: 'price_demo_monthly',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      cancelAtPeriodEnd: false,
    },
  };

  const signIn = async (_email: string, _password: string): Promise<void> => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setCustomUser(mockCustomUser);
    setLoading(false);
  };

  const signUp = async (_email: string, _password: string, _displayName?: string): Promise<void> => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newMockUser = { ...mockUser, email: _email, displayName: _displayName || 'New User' };
    const newMockCustomUser = { ...mockCustomUser, email: _email, displayName: _displayName || 'New User' };
    setUser(newMockUser);
    setCustomUser(newMockCustomUser);
    setLoading(false);
  };

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setCustomUser(mockCustomUser);
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setCustomUser(null);
    setLoading(false);
  };

  const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    if (user) {
      const updatedUser = { ...user, displayName, photoURL: photoURL || user.photoURL };
      const updatedCustomUser = customUser ? { ...customUser, displayName, photoURL: photoURL || customUser.photoURL } : null;
      setUser(updatedUser);
      setCustomUser(updatedCustomUser);
    }
  };

  const value = {
    user,
    customUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
