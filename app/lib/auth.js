import { fetcher } from "../app/lib/api";

export const login = async (credentials) => {
  const res = await fetcher("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.token) {
    localStorage.setItem("token", res.token); // Store token
  }

  return res;
};
