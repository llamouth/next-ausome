"use client";
import { useState } from "react";
import { fetcher } from "@/app/lib/api";

export default function DeletePost({
  setDeletePost,
  postId,
  setAllPosts,
  userId,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetcher(`/users/${userId}/posts/${postId}`, {
        method: "DELETE",
      });

      setAllPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
      setDeletePost(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-lg font-bold">Delete Post?</h2>
        <p className="text-gray-600 mt-2">This action cannot be undone.</p>
        <div className="mt-4 flex justify-around">
          <button
            onClick={() => setDeletePost(false)}
            className="px-4 py-2 bg-gray-300 rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
