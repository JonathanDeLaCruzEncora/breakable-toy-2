"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  image: string;
}

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUserProfile: () => Promise<boolean | undefined>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setLoggedIn: (bool: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Cargar el token desde localStorage al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      console.log("checking");
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      console.log(token);
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [loggedIn]);

  // Obtener el perfil del usuario
  const fetchUserProfile = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener el perfil del usuario");
      }

      const data = await response.json();
      console.log("hi");
      setUser({
        name: data.display_name,
        image: data.images?.[1]?.url || "",
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        fetchUserProfile,
        isAuthenticated,
        isLoading,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
