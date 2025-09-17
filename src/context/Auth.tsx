import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  userId: string | null;
  email: string | null;
  name: string | null;
  isAuth: boolean | null;
  setAuth: (
    userId: string,
    email: string,
    name: string,
    auth: boolean | null
  ) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [name, setName] = useState<string | null>(null);

  const setAuth = (
    userId: string,
    email: string,
    name: string,
    auth: boolean | null
  ) => {
    setUserId(userId);
    setEmail(email);
    setName(name);
    setIsAuth(auth);
  };

  const clearAuth = () => {
    setUserId(null);
    setEmail(null);
    setName(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ userId, email, name, isAuth, setAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
