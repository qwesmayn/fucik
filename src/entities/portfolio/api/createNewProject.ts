

import { fetchBase } from "@/shared/lib/api";
import { IProject } from "../model/IProject.interface";

export const createNewProject = async (project: IProject, files?: File[]) => {

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("technologies", JSON.stringify(project.technologies));
  formData.append("url", project.url || "");
  formData.append("position", project.position?.toString() || "0");

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await fetchBase("projects/create", {
    method: "POST",
    body: formData,
  });
  return response;
};