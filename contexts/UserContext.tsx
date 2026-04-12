"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id?: string;
  name: string;
  email: string;
  university: string;
  major?: string;
  role?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  verified?: boolean;
  rating?: number;
  totalReviews?: number;
  itemsListed?: number;
  completedRentals?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("unitool_user");
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("unitool_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("unitool_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("unitool_user");
    }
  };

  // Update specific user fields
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  // Logout function
  const logout = () => {
    setUserState(null);
    localStorage.removeItem("unitool_user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}