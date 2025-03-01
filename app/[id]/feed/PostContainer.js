"use client";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { fetcher } from "@/app/lib/api";

export default function PostContainer({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetcher(`/users/${userId}/posts`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}
