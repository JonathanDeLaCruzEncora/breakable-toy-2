"use client";

import { SearchResultsInterface } from "@/types/spotify";
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
  setSearchResults: (result: SearchResultsInterface | null) => void;
  searchResults: SearchResultsInterface | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [searchResults, setSearchResults] =
    useState<SearchResultsInterface | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
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

  const fetchUserProfile = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch("http://localhost:8080/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error("Error al obtener el perfil del usuario");
        return false;
      }

      const data = await response.json();
      setUser({
        name: data.display_name,
        image: data.images?.[0]?.url || "",
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
        searchResults,
        setSearchResults,
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
