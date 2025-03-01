"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Form Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Backend expects "password_hash", so we rename it
      const formattedUser = {
        username: values.username,
        password_hash: values.password, // Rename password field
      };
      console.log("fetch happening ", formattedUser);

      const res = await fetcher("/users/login", {
        method: "POST",
        body: JSON.stringify(formattedUser),
      });

      console.log("fetch done ");

      if (!res || res === false) {
        toast.error("Invalid username or password. Please try again.");
        return;
      }

      login(res.user, res.token);
      toast.success("Login successful! Redirecting...");
      router.push(`/${res.user.id}/feed`);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Login to Ausome
        </h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 mt-6">
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border rounded-md"
                />
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Password Input with Show/Hide Icon */}
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-all"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

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
