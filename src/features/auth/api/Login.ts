import { fetchBase } from "@/shared/lib/api";

export const login = async (username: string, password: string) => {
  const response = await fetchBase("user/sign-in", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
