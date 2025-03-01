"use client";
import { useState, useEffect } from "react";
import { fetcher } from "../app/lib/api";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CommentsContainer({ postId, setComments, comments }) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetcher(`/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    try {
      const res = await fetcher(`/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: newComment }),
      });

      setComments((prev) => [...prev, res]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment.");
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Comments</h3>

      {/* Comment Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <Button onClick={handleAddComment} disabled={loading}>
          {loading ? "Adding..." : "Post"}
        </Button>
      </div>

      {/* Display Comments */}
      <div className="space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-2 bg-gray-200 rounded-md">
              <p className="text-sm font-semibold">{comment.user.username}:</p>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
