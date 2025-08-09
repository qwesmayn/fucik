import { fetchBase } from "@/shared/lib/api";
import { IProject } from "../model/IProject.interface";

export const getLatestProjects = async (): Promise<IProject[]> => {
  const response = await fetchBase("projects/latest", {
    next: {
      revalidate: 60,
    },
  });
  return response;
};
