import { notFound } from "next/navigation";

export const fetchBase = async (url: string, options?: RequestInit) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    {
      ...options,
      credentials: "include",
    }
  );

  if (!response.ok) {
    notFound();
  }

  return response;
};
