import { fetchBase } from "@/shared/lib/api";
import { IProject } from "../model/IProject.interface";

export const getAllProjects = async (): Promise<IProject[]> => {
  const response = await fetchBase("projects", {
    next: {
      tags: ["projects"],
      revalidate: 60,
    },
  });
  return response.json();
};
