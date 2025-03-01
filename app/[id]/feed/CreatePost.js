"use client";
import { useState } from "react";
import { fetcher } from "@/app/lib/api";

export default function CreatePost({ userId }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setError("Post content cannot be empty.");
      return;
    }

    try {
      await fetcher("/posts", {
        method: "POST",
        body: JSON.stringify({ user_id: userId, content, image_url: imageUrl }),
      });

      setContent("");
      setImageUrl("");
      alert("Post created!");
    } catch (error) {
      setError("Failed to create post.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg mb-4">
      <h2 className="text-xl font-semibold">Create a Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Post
        </button>
      </form>
    </div>
  );
}
