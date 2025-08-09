import { fetchBase } from "@/shared/lib/api";
import { notFound } from "next/navigation";

export const getProjectById = async (id: string) => {
  try {
    const response = await fetchBase(`projects/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    return response;
  } catch (error) {
    notFound();
  }
};
