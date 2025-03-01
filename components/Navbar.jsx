"use client";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Ausome
        </Link>

        {/* Right Side: Auth Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Info */}
              <Link href={`/${user.id}/profile`} className="flex items-center space-x-2">
              <Image
                src={user.profile_picture || "/default-profile.jpg"}
                alt="Profile"
                width={32} // Set width explicitly
                height={32} // Set height explicitly
                className="rounded-full border"
              />
                <span className="hidden sm:block">{ user.first_name } { user.last_name }</span>
              </Link>

              {/* Logout Button */}
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/login")} className="bg-white text-blue-600 hover:bg-gray-200">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
