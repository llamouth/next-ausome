"use client";
import { useState } from "react";
import { fetcher } from "@/app/lib/api";

export default function CreatePost({ userId }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(""); // For image preview
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handle File Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl("");
  };

  // Upload Image to Backend
  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetcher("/upload", {
        method: "POST",
        body: formData,
      });

      setUploading(false);
      return response.imageUrl; // Get Cloudinary URL from backend
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
      return null;
    }
  };

  // Handle Post Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setError("Post content cannot be empty.");
      return;
    }

    setError("");

    let uploadedImageUrl = imageUrl; // Use existing image URL if provided

    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) {
        setError("Image upload failed. Try again.");
        return;
      }
      uploadedImageUrl = uploadedUrl;
    }

    try {
      await fetcher("/posts", {
        method: "POST",
        body: JSON.stringify({ user_id: userId, content, image_url: uploadedImageUrl }),
      });

      setContent("");
      setImageFile(null);
      setPreviewUrl("");
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

        {/* Image Upload Input */}
        <input
          type="file"
          className="w-full p-2 border rounded-md"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Image Preview */}
        {previewUrl && (
          <div className="mt-2 relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-md border border-gray-300"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
            >
              X
            </button>
          </div>
        )}

        {/* Show uploading status */}
        {uploading && <p className="text-blue-500">Uploading image...</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </form>
    </div>
  );
}
