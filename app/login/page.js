"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetcher("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(res.user, res.token);
      toast.success("Login successful! Redirecting...");
      router.push(`/${res.user.id}/feed`); // Redirect to user feed
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Login to Ausome
        </h1>

        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
