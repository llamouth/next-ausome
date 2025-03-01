"use client";
import { useRouter } from "next/navigation";
import { fetcher } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignUpPage() {
  const { login } = useAuth();
  const router = useRouter();

  // Form Validation Schema
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    username: Yup.string().min(3, "Must be at least 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const formattedUser = {
        ...values,
        password_hash: values.password, 
        profile_picture: values.profile_picture || "", 
        bio: values.bio || "", 
      };
  
      delete formattedUser.password; 
  
      const res = await fetcher("/users", {
        method: "POST",
        body: JSON.stringify(formattedUser),
      });
  
      login(res.user, res.token);
      toast.success("Account created successfully! Redirecting...");
      router.push(`/${res.user.id}/feed`);
    } catch (error) {
      toast.error("Sign-up failed. Please try again.");
      console.error("Sign-up error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h2>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 mt-4">
              <div>
                <Field type="text" name="first_name" placeholder="First Name" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="first_name" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field type="text" name="last_name" placeholder="Last Name" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="last_name" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field type="email" name="email" placeholder="Email" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-md" />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>

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
