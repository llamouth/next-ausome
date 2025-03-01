"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { fetcher } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user data using the stored token
  const fetchUserData = async (storedToken) => {
    try {
        const res = await fetcher("/users/me", {
            headers: { Authorization: storedToken }, 
        });

        setUser(res); // ✅ Store user data in state
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
    } finally {
        setLoading(false);
    }
  };

  // Login function
  const login = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    fetchUserData(userToken); // Fetch user data dynamically
    toast.success("Login successful!");
    router.push(`/feed`);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
