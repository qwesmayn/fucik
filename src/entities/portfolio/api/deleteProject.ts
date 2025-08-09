"use server";

import { fetchBase } from "@/shared/lib/api";
import { cookies } from "next/headers";

export const deleteProject = async (id: number) => {
  const cookieStore = await cookies();

  const response = await fetchBase(`projects/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};