import { fetchBase } from "@/shared/lib/api";

export const getAllProjects = async () => {
  const response = await fetchBase("projects", {
    next: {
      revalidate: 60,
    },
  });
  return response;
};
