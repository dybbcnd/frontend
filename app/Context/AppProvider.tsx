"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context
interface AppContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  // Dummy implementations for login and register
  const login = async (email: string, password: string) => {
    // Replace with real logic
    console.log("Logging in:", email, password);
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    // Replace with real logic
    console.log("Registering:", name, email, password, password_confirmation);
  };

  return (
    <AppContext.Provider value={{ login, register }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function myAppHook() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("myAppHook must be used within an AppProvider");
  }
  return context;
}