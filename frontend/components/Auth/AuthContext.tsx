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
  isTokenExpired: () => boolean;
  refreshAccessToken: () => Promise<void>;
  fetchData: (url: string, accessToken: string) => Promise<any>;
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

  function isTokenExpired() {
    const expirationTime = localStorage.getItem("token_expiration");
    if (!expirationTime) return true;
    return Date.now() > parseInt(expirationTime); // Compara con el tiempo actual
  }

  const fetchUserProfile = async () => {
    if (!accessToken) return;

    try {
      if (isTokenExpired()) {
        await refreshAccessToken();
      }
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

  async function refreshAccessToken() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return;
      const response = await fetch(
        "http://localhost:8080/auth/spotify/refresh",
        {
          method: "POST",
          body: new URLSearchParams({ refresh_token: refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        setAccessToken(data.access_token);
      }
      if (data.refresh_token)
        localStorage.setItem("refresh_token", data.refresh_token);

      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem("token_expiration", expirationTime.toString());
      }

      return data.access_token;
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async (url: string, accessToken: string) => {
    if (isTokenExpired()) {
      await refreshAccessToken();
    }
    const response = await fetch(`http://localhost:8080${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error fetching data from ${url}: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
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
        isTokenExpired,
        refreshAccessToken,
        fetchData,
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
