"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignUpPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetcher("/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      login(res.user, res.token);
      toast.success("Account created successfully! Redirecting...");
      router.push(`/${res.user.id}/feed`); // Redirect to feed after signup
    } catch (error) {
      toast.error("Sign-up failed. Please try again.");
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/login")}>
            Log in
          </span>
        </p>
      </div>
    </main>
  );
}
