"use client";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to <span className="text-blue-600">Ausome</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          A safe and inclusive space where everyone can connect, express, and
          thrive.
        </p>

        {/* Conditional Button for Authentication */}
        {user ? (
          <Button
            className="mt-6 text-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push(`/${user.id}/feed`)}
          >
            Go to Your Feed
          </Button>
        ) : (
          <Button
            className="mt-6 text-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            Join the Community
          </Button>
        )}
      </section>

      {/* About Section */}
      <section className="max-w-4xl mt-12 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          About Ausome
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Ausome is an inclusive social platform designed to foster meaningful
          connections and support for individuals on the autism spectrum. It
          provides a safe and engaging space where users can share experiences,
          access resources, and interact with a supportive community. With a
          focus on accessibility, intuitive design, and personalized features,
          Ausome empowers users to express themselves, build relationships, and
          thrive in a digital space tailored to their unique needs.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            title: "Inclusive Community",
            desc: "A safe and welcoming space for all.",
          },
          {
            title: "Accessibility First",
            desc: "Designed with inclusivity in mind.",
          },
          {
            title: "Personalized Experience",
            desc: "Features tailored to your needs.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="shadow-md dark:shadow-lg transform transition duration-300 hover:scale-105"
          >
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Ausome. All rights reserved.
      </footer>
    </main>
  );
}
