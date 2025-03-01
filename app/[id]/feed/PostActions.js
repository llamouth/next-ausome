"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { fetcher } from "@/app/lib/api";

export default function PostActions({
  postId,
  userId,
  postUserId,
  likes,
  setLikes,
  showComments,
  setShowComments,
}) {
  const [likedPost, setLikedPost] = useState(
    likes.some((like) => like.user_id === userId)
  );
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLike = async () => {
    try {
      if (likedPost) {
        // Unlike Post
        const like = likes.find((like) => like.user_id === userId);
        await fetcher(`/users/${postUserId}/posts/${postId}/likes/${like.id}`, {
          method: "DELETE",
        });
        setLikes(likes.filter((like) => like.id !== like.id));
      } else {
        // Like Post
        const newLike = await fetcher(
          `/users/${postUserId}/posts/${postId}/likes`,
          {
            method: "POST",
            body: JSON.stringify({ user_id: userId }),
          }
        );
        setLikes([...likes, newLike]);
      }
      setLikedPost(!likedPost);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Card.Footer className="bg-white border-t border-gray-200 flex justify-around items-center">
      <Button
        variant="link"
        onClick={handleLike}
        className={`flex items-center no-underline ${
          likedPost ? "text-blue-700" : "text-blue-500 hover:text-blue-700"
        }`}
      >
        <FaThumbsUp className="mr-2" /> {likes.length}
      </Button>
      <Button
        variant="link"
        className="text-blue-500 hover:text-blue-700 flex items-center no-underline"
        onClick={() => setShowComments(!showComments)}
      >
        <FaCommentDots className="mr-2" /> Comments
      </Button>
    </Card.Footer>
  );
}
