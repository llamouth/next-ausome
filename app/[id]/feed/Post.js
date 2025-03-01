"use client";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { fetcher } from "@/app/lib/api";
import { useParams, useRouter } from "next/navigation";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentsContainer from "@/components/CommentsContainer";
import DeletePost from "./DeletePost";

export default function Post({ post, setAllPosts }) {
  const { id } = useParams(); // Current logged-in user ID
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchUserAndLikes = async () => {
      try {
        // Fetch user details
        const userData = await fetcher(`/users/${post.user_id}`);
        setUser(userData);

        // Fetch likes
        const likesData = await fetcher(
          `/users/${post.user_id}/posts/${post.id}/likes`,
          {
            headers: { Authorization: token },
          }
        );
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndLikes();
  }, [post.user_id, post.id, token]);

  return (
    <>
      {deletePost && (
        <DeletePost
          setDeletePost={setDeletePost}
          postId={post.id}
          setAllPosts={setAllPosts}
          userId={user.id}
        />
      )}

      <Card className="mb-4 shadow-sm border-gray-300">
        <Card.Body className="p-4 relative">
          <PostHeader
            user={user}
            postUserId={post.user_id}
            currentUserId={id}
            setDeletePost={setDeletePost}
          />
          <Card.Text className="text-gray-800">{post.content}</Card.Text>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full rounded-lg mt-2"
            />
          )}
        </Card.Body>

        <PostActions
          postId={post.id}
          userId={id}
          postUserId={post.user_id}
          likes={likes}
          setLikes={setLikes}
          showComments={showComments}
          setShowComments={setShowComments}
        />

        {showComments && (
          <div className="bg-gray-100 p-4 border-t border-gray-300 mt-2">
            <CommentsContainer
              postId={post.id}
              setComments={setComments}
              comments={comments}
            />
          </div>
        )}
      </Card>
    </>
  );
}
