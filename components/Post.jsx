import { useState } from "react";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h3 className="font-semibold">@{post.user_id}</h3>
      <p className="text-gray-700">{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="Post" className="mt-2 rounded-lg" />}
      
      {/* Post Actions */}
      <div className="flex items-center mt-3 space-x-4">
        <LikeButton postId={post.id} />
        <button 
          className="text-blue-500" 
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
}
