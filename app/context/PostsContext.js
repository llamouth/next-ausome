"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { fetcher } from "@/lib/api";
import { useUser } from "./UserContext";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { user, token } = useUser();
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    const fetchPosts = async () => {
      try {
        const res = await fetcher(`/users/${user.id}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user, token]);

  return (
    <PostsContext.Provider value={{ allPosts, setAllPosts, posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
