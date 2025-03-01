"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { fetcher } from "@/lib/api";
import { useUser } from "./UserContext";
import { v4 as uuid } from "uuid";

const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const { user, token } = useUser();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    const fetchFriends = async () => {
      try {
        const res = await fetcher(`/users/${user.id}/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pending = res
          .filter((friend) => friend.status === "pending" && friend.id !== user.id)
          .map((user) => ({ ...user, uuid: uuid() }));

        setPendingRequests(pending);
        setFriends(res);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [user, token]);

  return (
    <FriendsContext.Provider value={{ friends, setFriends, pendingRequests, setPendingRequests }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => useContext(FriendsContext);
