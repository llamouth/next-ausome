const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url, options = {}) => {
  let token = null;
  
  // Ensure token is fetched only on the client
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `${token}` }),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};
