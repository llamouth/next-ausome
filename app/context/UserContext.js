"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { fetcher } from "@/lib/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async (id) => {
    try {
      const res = await fetcher(`/users/${id}`);
      setUser(res);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile, token, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
