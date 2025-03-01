"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher } from "@/app/lib/api";
import { useAuth } from "@/app/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PostContainer from "./PostContainer";
import CreatePost from "./CreatePost";

export default function FeedPage() {
  const { id } = useParams(); // Get user ID from URL
  const { user, loading } = useAuth();
  const router = useRouter();
  const [feedUser, setFeedUser] = useState(null);

  useEffect(() => {
    if (!loading && user?.id !== Number(id)) {
      router.push(`/${user?.id}/feed`); // Redirect user to their own feed
    }
  }, [user, id, loading, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetcher(`/users/${id}`);
        setFeedUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen p-6">
        {feedUser ? (
          <>
            <h1 className="text-3xl font-bold">
              Welcome, {feedUser.username}!
            </h1>
            <CreatePost userId={id} />
            <PostContainer userId={id} />
          </>
        ) : (
          <p>Loading feed...</p>
        )}
      </main>
    </ProtectedRoute>
  );
}
